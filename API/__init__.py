""" from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SECRET_KEY'] = 'app_123'

print('Hola')


import API.routes.client
import API.routes.user
 """

from flask import Flask, render_template, request, jsonify, after_this_request, session
from flask_cors import CORS
import jwt
 
app = Flask(__name__)

# Clave secreta para la generación y verificación de tokens JWT
app.config['SECRET_KEY'] = '132as4d56a4sd5as4d'

CORS(app)

from API.db.db import mysql, DBError

# Función para obtener el usuario autenticado desde el token JWT
def get_logged_in_user():

    token = request.args.get('authToken')

    if not token:
        return None
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None  # Token ha caducado
    except jwt.InvalidTokenError:
        return None  # Token no válido
    
# Middleware para verificar el inicio de sesión en ciertas rutas
@app.before_request
def before_request():
    logged_in_user = get_logged_in_user()

    if  request.endpoint and request.endpoint != 'login' and not logged_in_user:
        return {'message' : 'El usuario no ha iniciado sesion'}, 403
    else:
        print ( logged_in_user )
        
    if ( request.endpoint != 'login'):
        session['id'] = logged_in_user['id']

import API.routes.producto
import API.routes.servicio
import API.routes.cliente
import API.routes.usuario
import API.routes.venta

app.static_folder = 'app/static'
app.template_folder = 'app/templates'

if __name__ == "__main__":
    app.run(debug=True)
