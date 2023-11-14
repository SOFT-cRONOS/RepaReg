from flask import Flask, jsonify, request
# from flask_mysqldb import MySQL


import jwt
import datetime
from functools import wraps
from flask_cors import CORS

from taller  import Transaccion
from usuarios import Client

app = Flask(__name__)

CORS(app) # habilita las consultas externas ej navegador

# app.config['MYSQL_HOST'] = '172.17.0.2'
# app.config['MYSQL_USER'] = 'reparegadmin'
# app.config['MYSQL_PASSWORD'] ='7cronos1'
# app.config['MYSQL_DB'] = 'RepaRegBD'
# app.config["MYSQL_PORT"] = 33060

app.config['SECRET_KEY'] = 'app_123'

import mysql.connector

mysql = mysql.connector.connect(
    database='RepaRegBD',
    host="172.17.0.2",
    user="root",
    password="7cronos1"
)

# mydb = MySQL(app)

# Configura el directorios por defecto
app.static_folder = 'app/static'
app.template_folder = 'app/templates'


@app.route('/')
def index():
    return jsonify({"message": "API desarrollada con Flask"})

@app.route('/client', methods = ['GET'])
def get_all_client():
    cur = mysql.cursor()
    cur.execute("SELECT u.* FROM usuario u JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario JOIN roles r ON ur.id_rol = r.id_rol WHERE r.rol = 'CLIENTE'")
    data = cur.fetchall()
    print(cur.rowcount)
    print(data)
    clientList = []
    for row in data:
        objPerson = Client(row)
        clientList.append(objPerson.to_json())
    return jsonify( clientList )



#handler dashboard
@app.route('/lastweekrepa', methods = ['GET'])
def get_lastweek_repas():
    query = """SELECT t.*, i.nombre_item, i.id_tipoitem 
                FROM transaccion t JOIN item i ON t.id_item = i.id_item 
                WHERE t.estado = 1   
                AND t.tipo_trans = 'reparacion'   
                AND t.fecha_fin BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW();"""

    cur = mysql.cursor()
    cur.execute(query)
    data = cur.fetchall()
    print(cur.rowcount)
    print(data)
    lastweek_repas = []
    for row in data:
        objRepas = Transaccion(row)
        lastweek_repas.append(objRepas.to_json())
    return jsonify( lastweek_repas )

if __name__ == "__main__":
    app.run(debug=True, port=4500)
