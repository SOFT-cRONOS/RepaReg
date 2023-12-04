-<h3 align="center">Proyecto Informatico - grupo n° 24</h3>
integrantes:
Matías José Rivadeneira
Ríos Patricia Roxana
Donato Nicolas Miguel

# RepaReg
Software para gestion de taller de reparaciones.

# Documentación API RepaReg

Bienvenidos a la documentación de la API RepaReg. Esta documentación cubre todas las funcionalidades disponibles a través de nuestra API.

## Versión Actual
La versión actual de la API es `v1`. Todas las solicitudes deben dirigirse a `http://localhost:5200`.

## Registro de Cambios
Para ver un registro detallado de los cambios en cada versión, por favor visita la [sección de registro de cambios](#registro-de-cambios).
Fecha 3/12/2023

Estructura de directorios

    
    API/
    |     |___config/
    |     |          |__conect.py 
    |     |___db/
    |     |          |__BDconfig.py
    |     |          |__db.py
    |     |          |__ init.py
    |     |___models/
    |     |     |__cliente.py
    |     |     |__producto.py
    |     |     |__servicio.p
    |     |      |__user.py
    |     |     |__venta.py
    |     |___routes
    |     |     |__ init.py
    |     |     |__ cliente.py
    |     |     |__ producto.py
    |     |     |__ reportes.py
    |     |     |__ servicio.py 
    |     |     |__ tablero.py
    |     |     |__ usuario.py
    |     |     |__ venta.py
    |     |____init__.py
    |     |___app.py
    |     |___utils.py
    | 
    Front/
    |     |__categorias.html
    |     |__clientes.html
    |     |__index.html
    |     |__login.html
    |     |__productos.html
    |     |__reporte_stock.html
    |     |__reporte_total_compras_x_clientes.html
    |     |__servicios.html
    |     |__ventas.html
    |
    Doc/
    |     |__API RepaReg.pdf
    |     |__diagrama_bd.drawio
    |     |__rutas_frontend.drawio
    .gitignore
    |
    README.md
    |
    main.py
    |
    reparegbd.sql
    |
    requeriments.txt



1. Crar directorio de proyecto
2. Crear entorno virtual. En windows py -3 -m venv .venv, en unix: python -m venv .venv
3. Activamos el entorno virtual en windows .venv\Scripts\acitvate. En unix: source .venv/bin/activate
4. Creamos el archivos de requerimientso, requirements.txt

            click==8.1.7
            colorama==0.4.6
            Flask==2.2.5
            importlib-metadata==6.7.0
            itsdangerous==2.1.2
            Jinja2==3.1.2
            MarkupSafe==2.1.3
            typing_extensions==4.7.1
            Werkzeug==2.2.3
            zipp==3.15.0
            flask-mysqldb == 1.0.1
            PyJWT == 2.8.0
            flask-cors

6. Instalar dependencias, pip install  -r requeriments.txt
7. Ejecutar modo debugger python main.py

* Base de datos en MySQL
    
    - UML (grafico de estructura de base de datos)

* Funciones de interfaz

    - Registro de clientes
    - Registro de productos
    - Registro de ventas
    - Historial de reparaciones

* Lenguajes

    - Python
    - MySQL
    - HTML
    - CSS
* Enlace al notion del api: https://www.notion.so/invite/af11327f1b070c2cb7fe62a8b892b90eb905a4ae

## Explicación:

### main.py 
Es el punto de inicio de la aplicación, su función es importar el objeto app y ejecutar su método run.

from API import app
import sys

if len(sys.argv) > 1 and sys.argv[1] == "list":
    print(app.url_map)
elif _name_ == "_main_":
    app.run( debug=True, port= 5200)


---
    
### Directorios 
+ _init_ es el punto de entrada de la aplicación web y la API. Al ejecutar este archivo, se pone en marcha el servidor Flask que espera y responde a las solicitudes HTTP de los clientes, como navegadores o aplicaciones de frontend. La API utiliza autenticación basada en tokens para proteger los endpoints y asegurar que solo los usuarios autenticados puedan acceder a ciertas funcionalidade.
+ /api/routes contiene todos los archivos relacionados con las creaciones de rutas, cada uno agrupando las rutas referidas a un mismo recurso.
+ /api/models contiene todos los archivos relacionados con las definiciones de clases, principalmente para facilitar el formateo de datos desde la BD en formato JSON.
+ /api/db contiene lo relacionado a la configuración y conección a la BD.

---

### Archivos
*api/\_init\_.py* crea el objeto app como una instancia de Flask, incorpora CORS y configura la clave secreta de la aplicación. También debe importar todas las rutas para cada recurso. Establece una función (get_logged_in_user) para decodificar y verificar los tokens JWT proporcionados en las solicitudes. Esto es parte del mecanismo de autenticación y control de acceso. Define un middleware que se ejecuta antes de cada solicitud para verificar si el usuario ha iniciado sesión, excepto para las solicitudes al endpoint de inicio de sesión. Importa módulos que definen las rutas de la API. Si el archivo se ejecuta como el script principal, arranca el servidor web en modo de depuración.

from flask import Flask,  request, session
from flask_cors import CORS
import jwt
 
app = Flask(_name_)

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
        
    if ( request.endpoint != 'login' and logged_in_user):
        session['id'] = logged_in_user['id']

import API.routes.tablero
import API.routes.producto
\#otros import..
if _name_ == "_main_":
    app.run(debug=True)

    
    \# Otras funciones ..

*api/db/db.py* contiene la configuración de la BD y crea el objeto mysql, que debe ser importado desde todos los módulos que requieran una conección a la BD.

from API import app
from flask_mysqldb import MySQL

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'reparegbd'

mysql = MySQL(app)

class DBError(Exception):
    pass



*api/models/client.py* contiene la definición de la clase Client, con su constructor y un método para formatear en JSON. Define funciones a importar.

from API.db.db import mysql, DBError
from flask import session

class Cliente():

    def _init_(self, row):
        self._id = row[0]
        self._nombre = row[1]
        self._apellido = row[2]
        self._cuit_cuil = row[3]
        self._direccion = row[4]
        self._email = row[5]
        self._telefono = row[6]

    def to_json(self):
        return {
            "id": self._id,
            "nombre": self._nombre,
            "apellido" : self._apellido,
            "cuit_cuil": self._cuit_cuil,
            "direccion": self._direccion,
            "email": self._email,
            "telefono": self._telefono,
        }    
    
   
*api/routes/client.py* contiene las rutas para las operaciones CRUD del recurso client, y puede incorporar otras funcionalidades específicas sobre ese recurso. 
Debe importar la clase Cliente, el objeto app , el objeto mysql y las funciones de utilidades necesarias.
    
from API import app
from API.models.cliente import Cliente
from flask import jsonify, request, session
from API.db.db import mysql

# Rutas de clientes
@app.route('/clientes', methods=['GET'])
def obtener_clientes():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente WHERE id_usuario = %s', (session['id'], ))
    data = cur.fetchall()

    clientesList = []
    for row in data:
        objCliente = Cliente(row)
        clientesList.append(objCliente.to_json())
    
    cur.close()

    return jsonify(clientesList)

    
    /# Otras rutas del recurso client

Con esta estructura, la escalabilidad del proyecto se logra creando archivos de modelo y rutas para cada nuevo recurso que se deba incorporar.
