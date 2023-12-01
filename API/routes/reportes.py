from API import app
from flask import jsonify, request, session
from API.db.db import mysql

# Rutas de reportes
@app.route('/reportes/stock', methods=['GET'])
def obtener_reporte_stock():
    cur = mysql.connection.cursor()
    cur.execute('SELECT nombre, stock FROM producto WHERE id_usuario = %s ORDER BY nombre', (session['id'], ))
    data = cur.fetchall()

    reporteList = []
    for row in data:
        reporteList.append( { "nombre": row[0], "stock": row[1] } )
    
    cur.close()

    return jsonify(reporteList)

@app.route('/reportes/total_compras_por_cliente', methods=['GET'])
def obtener_reporte_total_compras_por_cliente():
    cur = mysql.connection.cursor()
    cur.execute('SELECT CONCAT(c.nombre, " ", c.apellido) nombre, SUM(v.total) total FROM venta v INNER JOIN cliente c ON c.id = v.id_cliente WHERE v.id_usuario = %s GROUP BY c.id ORDER BY total DESC;', (session['id'], ))
    data = cur.fetchall()

    reporteList = []
    for row in data:
        reporteList.append( { "nombre": row[0], "total": row[1] } )
    
    cur.close()

    return jsonify(reporteList)



@app.route('/reportes/reporte_total_compras_x_producto', methods=['GET'])
def obtener_reporte_total_compras_x_producto():
    cur = mysql.connection.cursor()
    cur.execute('SELECT CONCAT(c.nombre, " ", c.apellido) nombre, SUM(v.total) total FROM venta v INNER JOIN cliente c ON c.id = v.id_cliente WHERE v.id_usuario = %s GROUP BY c.id ORDER BY total DESC;', (session['id'], ))
    data = cur.fetchall()

    reporteList = []
    for row in data:
        reporteList.append( { "nombre": row[0], "total": row[1] } )
    
    cur.close()

    return jsonify(reporteList)