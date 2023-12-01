from API import app
from flask_mysqldb import MySQL

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'app_flask_db'
app.config['MYSQL_PASSWORD'] ='7cronos1'
app.config['MYSQL_DB'] = 'reparegbd'

mysql = MySQL(app)

class DBError(Exception):
    pass


