
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
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT id FROM usuario WHERE email = %s AND password = %s", (email, password))

    user = cur.fetchone()

    cur.close()
   
    if user:

        token = jwt.encode({
                'username': email,
                'id': user[0],
                'exp': datetime.utcnow() + timedelta(minutes=3)  
            }, app.config['SECRET_KEY'], algorithm='HS256')


        response = jsonify({'token': token, "message": "Usuario logueado"})
        response.headers['Authorization'] = f'Bearer {token}'
        
        return response


    return jsonify({"message": 'Usuario o contraseña incorrectos'}), 403
