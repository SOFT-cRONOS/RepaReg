from API import app
from API.models.producto import Producto
from flask import jsonify, request, session
from API.db.db import mysql

# Rutas de productos
@app.route('/productos', methods=['GET'])
def obtener_productos():

    cur = mysql.connection.cursor()
    cur.execute('SELECT p.*, m.nombre marca, c.nombre categoria FROM producto p INNER JOIN marca m 	ON p.id_marca = m.id INNER JOIN categoria c ON p.id_categoria = c.id WHERE id_usuario = %s', (session['id'], ) )
    data = cur.fetchall()

    productosList = []
    for row in data:
        objProducto = Producto(row)
        productosList.append(objProducto.to_json())
    
    cur.close()

    return jsonify(productosList)

@app.route('/productos/<int:id_producto>', methods=['GET'])
def obtener_producto_by_id(id_producto):

    cur = mysql.connection.cursor()
    cur.execute('SELECT p.*, m.nombre marca, c.nombre categoria FROM producto p INNER JOIN marca m 	ON p.id_marca = m.id INNER JOIN categoria c ON p.id_categoria = c.id WHERE p.id = %s', (id_producto,))
    data = cur.fetchall() 
    
    objProducto = Producto(data[0])
    
    cur.close()

    return jsonify(objProducto.to_json())

@app.route('/productos', methods = ['POST'])
def crear_producto():

    data = request.get_json()

    try:
        new_producto = Producto.crear_producto(data)

        return jsonify( new_producto ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

@app.route('/productos/<int:id_producto>', methods = ['PUT'])
def modificar_producto(id_producto):

    data = request.get_json()

    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM producto WHERE id = %s', (id_producto,))
        user = cur.fetchone()         

        if ( user[0] == session['id'] ):
            response = Producto.modificar_producto(id_producto, data)        
            status_code = 201
        else:
            response = { "message": "No tiene permiso para modificar el producto" }
            status_code = 403
        
        return jsonify( response ), status_code
    
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400


@app.route('/productos/<int:id_producto>', methods = ['DELETE'])
def eliminar_producto(id_producto):
   
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM producto WHERE id = %s', (id_producto,))
        user = cur.fetchone()         

        if ( user[0] == session['id'] ):
            response = Producto.eliminar_producto(id_producto)   
            status_code = 200
        else:
            response = { "message": "No tiene permiso para eliminar el producto" }
            status_code = 403
        
        return jsonify( response ), status_code
    
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400