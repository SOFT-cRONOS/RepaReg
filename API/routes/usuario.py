
from API import app
from flask import request, jsonify, session
from API.db.db import mysql
import jwt
import datetime
from datetime import datetime, timedelta
from API.models.user import User

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
                'exp': datetime.utcnow() + timedelta(hours=1)  
            }, app.config['SECRET_KEY'], algorithm='HS256')


        response = jsonify({'token': token, "message": "Usuario logueado"})
        response.headers['Authorization'] = f'Bearer {token}'
        
        return response


    return jsonify({"message": 'Usuario o contraseña incorrectos'}), 403

@app.route('/usuarios', methods=['GET', 'POST'])
def user_data():
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM usuario WHERE id = %s', (session['id'], ))
        data = cur.fetchall()
        if cur.rowcount > 0:
            userData = User(data[0])
            return jsonify(userData.to_json())
        cur.close()
    elif request.method == 'POST':
        pass