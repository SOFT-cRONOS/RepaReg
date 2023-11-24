import mysql.connector as SQL

# from mysql.connector import Error
mysql = SQL.connect(host='172.17.0.2',
                              database='RepaRegBD',
                              user='reparegadmin',
                              password='reparegpass')