from API import app
from API.models.servicio import Servicio
from flask import jsonify, request
from API.utils import token_required, client_resource, user_resources
from API.db.db import mysql

# Rutas de servicios
@app.route('/servicios', methods=['GET'])
def obtener_servicios():

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM servicio')
    data = cur.fetchall()

    serviciosList = []
    for row in data:
        objServicio = Servicio(row)
        serviciosList.append(objServicio.to_json())
    
    cur.close()

    return jsonify(serviciosList)

@app.route('/servicios/<int:id_servicio>', methods=['GET'])
def obtener_servicio_by_id(id_servicio):

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM servicio WHERE id = %s', (id_servicio, ) )
    data = cur.fetchall()    
    
    objServicio = Servicio(data[0])
    
    cur.close()

    return jsonify(objServicio.to_json())

@app.route('/servicios', methods = ['POST'])
#@token_required
def crear_servicio():
    data = request.get_json()

    try:
        new_servicio = Servicio.crear_servicio(data)

        return jsonify( new_servicio ), 201
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400

@app.route('/servicios/<int:id_servicio>', methods = ['PUT'])
#@token_required
def modificar_servicio(id_servicio):
    data = request.get_json()

    try:
        response = Servicio.modificar_servicio(id_servicio, data)

        return jsonify( response ), 200
    except Exception as e:
        return jsonify( {"message": e.args[1]} ), 400

@app.route('/servicios/<int:id_servicio>', methods = ['DELETE'])
#@token_required
def eliminar_servicio(id_servicio):
   
    try:
        response = Servicio.eliminar_servicio(id_servicio)

        return jsonify( response ), 200
    except Exception as e:
        return jsonify( {"message": e.args[1]} ), 400