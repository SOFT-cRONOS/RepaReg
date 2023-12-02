from API import app
from API.models.cliente import Cliente
from flask import jsonify, request, session
from API.db.db import mysql

# Rutas de clientes
@app.route('/clientes', methods=['GET'])
def obtener_clientes():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente WHERE id_usuario = %s', (session['id'], ))
    data = cur.fetchall()

    clientesList = []
    for row in data:
        objCliente = Cliente(row)
        clientesList.append(objCliente.to_json())
    
    cur.close()

    return jsonify(clientesList)

@app.route('/clientes/<int:id_cliente>', methods=['GET'])
def obtener_cliente_by_id(id_cliente):

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente WHERE id = %s', (id_cliente,))
    data = cur.fetchall() 

    if ( int(data[0][7]) == session['id'] ):
        objCliente = Cliente(data[0])
        cur.close()
    
        return jsonify(objCliente.to_json())
    else:
        cur.close()
        return jsonify({"message": "Cliente no encontrado"}), 404


@app.route('/clientes', methods = ['POST'])
def crear_cliente():
    data = request.get_json()

    try:
        new_cliente = Cliente.crear_cliente(data)

        return jsonify( new_cliente ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

@app.route('/clientes/<int:id_cliente>', methods = ['PUT'])
def modificar_cliente(id_cliente):
    data = request.get_json()

    try:

        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM cliente WHERE id = %s', (id_cliente,))
        user = cur.fetchone()         

        cur.close()

        if ( user[0] == session['id'] ):
            response = Cliente.modificar_cliente(id_cliente, data)
            status_code = 200
        else:
            response = { "message": "No tiene permiso para modificar el cliente" }
            status_code = 403
        
        return jsonify( response ), status_code

        
    except Exception as e:
        return jsonify( {"message": e.args[1]} ), 400

@app.route('/clientes/<int:id_cliente>', methods = ['DELETE'])
def eliminar_cliente(id_cliente):
   
    try:
        response = Cliente.eliminar_cliente(id_cliente)

        return jsonify( response ), 200
    except Exception as e:
        return jsonify( {"message": e.args[1]} ), 400 
    