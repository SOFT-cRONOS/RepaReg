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
    
    objCliente = Cliente(data[0])
    
    cur.close()

    return jsonify(objCliente.to_json())

@app.route('/clientes', methods = ['POST'])
#@token_required
def crear_cliente():
    data = request.get_json()

    try:
        new_cliente = Cliente.crear_cliente(data)

        return jsonify( new_cliente ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

@app.route('/clientes/<int:id_cliente>', methods = ['PUT'])
#@token_required
def modificar_cliente(id_cliente):
    data = request.get_json()

    try:
        response = Cliente.modificar_cliente(id_cliente, data)

        return jsonify( response ), 200
    except Exception as e:
        return jsonify( {"message": e.args[1]} ), 400

@app.route('/clientes/<int:id_cliente>', methods = ['DELETE'])
#@token_required
def eliminar_cliente(id_cliente):
   
    try:
        response = Cliente.eliminar_cliente(id_cliente)

        return jsonify( response ), 200
    except Exception as e:
        return jsonify( {"message": e.args[1]} ), 400 
    


'''@app.route('/usuarios', methods=['GET', 'POST'])
def user_data():
    if request.method == 'GET':
       return jsonify("hila")
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuario WHERE id_usuario = %s', (session['id'], ))
        data = cur.fetchall()
        if cur.rowcount > 0:
            userData = User(data[0])
            return jsonify(userData)
        cur.close()
    elif request.method == 'POST':
        pass'''