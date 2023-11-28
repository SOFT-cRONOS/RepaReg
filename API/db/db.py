from API import app
from flask_mysqldb import MySQL

app.config['MYSQL_HOST'] = '172.17.0.2'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] ='7cronos1'
app.config['MYSQL_DB'] = 'reparegbd'

mysql = MySQL(app)

class DBError(Exception):
    pass


