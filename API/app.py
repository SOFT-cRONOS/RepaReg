from flask import Flask, jsonify, request
from flask_mysqldb import MySQL


import jwt
import datetime
from functools import wraps
from flask_cors import CORS

from taller  import Transaccion
from usuarios import Client

app = Flask(__name__)

CORS(app) # habilita las consultas externas ej navegador

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'reparegadmin'
app.config['MYSQL_PASSWORD'] ='7cronos1'
app.config['MYSQL_DB'] = 'RepaRegBD'

#app.config['SECRET_KEY'] = 'app_123'

mysql = MySQL(app)

# Configura el directorios por defecto
app.static_folder = 'app/static'
app.template_folder = 'app/templates'


@app.route('/')
def index():
    return jsonify({"message": "API desarrollada con Flask"})

# @app.route('/login')
# def login():
#     return render_template('user/login.html')
# Ruta de prueba para verificar la conexión a la base de datos
@app.route('/test_db_connection')
def test_db_connection():
    try:
        if mysql.connection:
            print("Conexión a la base de datos establecida correctamente.")
            cur = mysql.connection.cursor()
            cur.execute('SELECT 1')
            result = cur.fetchone()
            return jsonify({"message": "Conexión exitosa a la base de datos", "result": result[0]})
        else:
            print("La conexión a la base de datos es None.")
            return jsonify({"message": "La conexión a la base de datos es None"})
    except Exception as e:
        print(f"Error al conectar a la base de datos: {str(e)}")
        return jsonify({"message": "Error al conectar a la base de datos", "error": str(e)})
    finally:
        if 'cur' in locals() and cur:
            cur.close()


@app.route('/client', methods = ['GET'])
def get_all_client():
    cur = mysql.connection.cursor()
    cur.execute("SELECT u.* FROM usuario u JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario JOIN roles r ON ur.id_rol = r.id_rol WHERE r.rol = 'CLIENTE'")
    data = cur.fetchall()
    print(cur.rowcount)
    print(data)
    clientList = []
    for row in data:
        objPerson = Client(row)
        clientList.append(objPerson.to_json())
    return jsonify( clientList )

if __name__ == "__main__":
    app.run(debug=True, port=4500)
