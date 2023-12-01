from flask import Flask,  request, session
from flask_cors import CORS
import jwt
 
app = Flask(__name__)

# Clave secreta para la generación y verificación de tokens JWT
app.config['SECRET_KEY'] = '132as4d56a4sd5as4d'

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'# habilita las consultas externas ej navegador

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

import API.routes.tablero
import API.routes.producto
import API.routes.servicio
import API.routes.cliente
import API.routes.usuario
import API.routes.venta
import API.routes.reportes

if __name__ == "__main__":
    app.run(debug=True)
