""" from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SECRET_KEY'] = 'app_123'

print('Hola')


import API.routes.client
import API.routes.user
 """

from flask import Flask, render_template, request, jsonify, after_this_request
from flask_cors import CORS
 
app = Flask(__name__)

CORS(app)

from API.db.db import mysql, DBError

import API.routes.producto
import API.routes.servicio
import API.routes.cliente

app.static_folder = 'app/static'
app.template_folder = 'app/templates'

if __name__ == "__main__":
    app.run(debug=True)
