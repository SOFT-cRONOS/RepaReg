from API import app
from API.models.servicio import Servicio
from flask import jsonify, request, session
from API.db.db import mysql

# Rutas de servicios
@app.route('/servicios', methods=['GET'])
def obtener_servicios():

    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM servicio WHERE id_usuario = %s', (session['id'],) )
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
        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM servicio WHERE id = %s', (id_servicio,))
        user = cur.fetchone()         

        if ( user[0] == session['id'] ):
            response = Servicio.modificar_servicio(id_servicio, data)
            status_code = 200
        else:
            response = { "message": "No tiene permiso para modificar el servicio" }
            status_code = 403
        
        return jsonify( response ), status_code
    
    except Exception as e:
        return jsonify( {"message": e.args[0]} ), 400


@app.route('/servicios/<int:id_servicio>', methods = ['DELETE'])
#@token_required
def eliminar_servicio(id_servicio):
   
    try:
        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM servicio WHERE id = %s', (id_servicio,))
        user = cur.fetchone()         

        if ( user[0] == session['id'] ):
            response = Servicio.eliminar_servicio(id_servicio)
            status_code = 200
        else:
            response = { "message": "No tiene permiso para eliminar el servicio" }
            status_code = 403
        
        return jsonify( response ), status_code
    
    except Exception as e:
        return jsonify( {"message": e.args[1]} ), 400