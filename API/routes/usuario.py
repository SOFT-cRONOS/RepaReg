
from API import app
from flask import request, jsonify, session
from API.db.db import mysql
import jwt
import datetime
from datetime import datetime, timedelta

@app.route('/usuarios/login', methods = ['POST'])
def login():

    data = request.get_json()

    email = data['email']
    password = data['password']
    
    print(email, password)

    # Consulta la base de datos para el usuario
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM usuario WHERE email = %s AND password = %s", (email, password))

    user = cur.fetchone()

    cur.close()
   
    if user:
       
        # Genera un token JWT con la información del usuario
        token = jwt.encode({
                'username': email,
                'id': user[0],
                'exp': datetime.utcnow() + timedelta(hours=1)  # Caduca en 1 hora
            }, app.config['SECRET_KEY'], algorithm='HS256')


        # Devuelve el token en el encabezado Authorization
        response = jsonify({'token': token, "message": "Usuario logueado"})
        response.headers['Authorization'] = f'Bearer {token}'
        
        return response


    return jsonify({"message": 'Usuario o contraseña incorrectos'}), 403
