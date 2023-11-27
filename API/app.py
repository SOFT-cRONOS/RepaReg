from flask import Flask, render_template, request, jsonify, after_this_request
from flask_cors import CORS
#bd
from db.BDconfig import mysql

#rutas ventas
from routes.routeSell import sellHandle



app = Flask(__name__)


CORS(app) # habilita las consultas externas ej navegador
app.config['CORS_HEADERS'] = 'Content-Type'# habilita las consultas externas ej navegador


# Configura el directorios por defecto
app.static_folder = 'app/static'
app.template_folder = 'app/templates'


# @app.route('/')
# def index():
#     return render_template('index.html')
@app.route('/')
def index():
    return jsonify({"message": "API desarrollada con Flask"})




@app.route('/hello', methods=['GET'])
def hello():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

    jsonResp = {'jack2': 4098, 'sape': 4139}
    print(jsonResp)
    return jsonify(jsonResp)



# Registrar el Blueprint de clientes
app.register_blueprint(sellHandle, url_prefix='/sell')

if __name__ == "__main__":
    app.run(debug=True)
