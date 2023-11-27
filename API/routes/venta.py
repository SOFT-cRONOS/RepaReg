from API import app
from API.models.venta import Venta
from flask import jsonify, request, session
import jwt
from API.utils import token_required, client_resource, user_resources
from API.db.db import mysql

# Rutas de ventas
@app.route('/ventas', methods=['GET'])
def obtener_ventas():

    cur = mysql.connection.cursor()
    cur.execute('SELECT v.*, c.nombre cliente FROM venta v INNER JOIN cliente c	ON v.id_cliente = c.id WHERE v.id_usuario = %s;', (session['id'], ) )
    data = cur.fetchall()

    ventasList = []
    for row in data:
        objVenta = Venta(row)
        ventasList.append(objVenta.to_json())
    
    cur.close()

    return jsonify(ventasList)


@app.route('/ventas', methods = ['POST'])
def crear_venta():

    data = request.get_json()

    try:
        new_venta = Venta.crear_venta(data)

        return jsonify( new_venta ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400


@app.route('/ventas/<int:id_venta>', methods = ['DELETE'])
def eliminar_venta(id_venta):
   
    try:
        response = Venta.eliminar_venta(id_venta)

        return jsonify( response ), 200
    except Exception as e:
        return jsonify( {"message": e.args[1]} ), 400