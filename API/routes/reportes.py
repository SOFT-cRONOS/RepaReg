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


@app.route('/reportes/<int:idreport>', methods=['GET'])
def get_Report(idreport):
    cur = mysql.connection.cursor()
    if idreport == 1:
        cur.execute('''SELECT total
                        FROM venta
                        WHERE fecha > NOW() - INTERVAL 7 DAY
                        ORDER BY fecha DESC
                        LIMIT 7;''')
        data = cur.fetchall()

        reporteList = []
        for row in data:
            reporteList.append( row[0] ) 
        
        
        cur.close()

        return jsonify(reporteList)
    elif idreport == 2:
        cur.execute('''SELECT
                        categoria.nombre AS categoria,
                        COUNT(*) AS cantidad_ventas
                        FROM
                        detalle_venta
                        INNER JOIN
                        producto
                        ON
                        detalle_venta.id_producto = producto.id
                        INNER JOIN
                        categoria
                        ON
                        producto.id_categoria = categoria.id
                        GROUP BY
                        categoria.nombre''')
        data = cur.fetchall()

        reporteList = []
        for row in data:
            reporteList.append( {"categoria": row[0], "cantidad": row[1]} ) 
        
        
        cur.close()

        return jsonify(reporteList)