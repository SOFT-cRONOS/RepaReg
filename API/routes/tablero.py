from API import app
from flask import jsonify, session
from API.db.db import mysql

# Rutas de tablero
@app.route('/tablero', methods=['GET'])
def obtener_datos_tablero():
    cur = mysql.connection.cursor()
    cur.execute('SELECT SUM(total) total_ventas_hoy, COUNT(*) cant_ventas_hoy FROM `venta` WHERE id_usuario = %s AND DATE(fecha) = CURDATE();', (session['id'], ))
    dataTotalVentasHoy = cur.fetchone()

    totalVentasHoy = 0
    cantVentasHoy = 0

    if (dataTotalVentasHoy[0] != None) :
        totalVentasHoy = int(dataTotalVentasHoy[0] )
        cantVentasHoy = int(dataTotalVentasHoy[1] )

    cur.execute('SELECT COUNT(*) cant_clientes FROM `cliente` WHERE id_usuario = %s;', (session['id'], ))
    dataCantClientes = cur.fetchone()

    cantClientes = 0

    if (dataCantClientes[0] != None) :
        cantClientes= int(dataCantClientes[0] )
        
    
    cur.close()

    return jsonify( { "totalVentasHoy" : totalVentasHoy, "cantVentasHoy": cantVentasHoy, "cantClientes" : cantClientes })

