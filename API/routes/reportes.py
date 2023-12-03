from API import app
from flask import jsonify, request, session
from API.db.db import mysql
from datetime import datetime
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



@app.route('/reportes/reporte_total_ventas_x_producto', methods=['GET'])
def obtener_reporte_total_ventas_x_producto():
    cur = mysql.connection.cursor()
    cur.execute('SELECT p.nombre, SUM(dv.precio_unit * dv.cantidad) total, SUM(dv.cantidad) cantidad FROM venta v LEFT JOIN detalle_venta dv ON v.id = dv.id_venta INNER JOIN producto p ON dv.id_producto = p.id WHERE v.id_usuario = %s AND dv.id_producto IS NOT NULL GROUP BY dv.id_producto ORDER BY total DESC;', (session['id'], ))
    data = cur.fetchall()

    reporteList = []
    for row in data:
        reporteList.append( { "nombre": row[0], "total": row[1], "cantidad": row[2] } )
    
    cur.close()

    return jsonify(reporteList)

@app.route('/reportes/reporte_total_ventas_x_servicio', methods=['GET'])
def obtener_reporte_total_ventas_x_servicio():
    cur = mysql.connection.cursor()
    cur.execute('SELECT s.nombre, SUM(dv.precio_unit * dv.cantidad) total, SUM(dv.cantidad) cantidad FROM venta v LEFT JOIN detalle_venta dv ON v.id = dv.id_venta INNER JOIN servicio s ON dv.id_servicio = s.id WHERE v.id_usuario = %s AND dv.id_servicio IS NOT NULL GROUP BY dv.id_servicio ORDER BY total DESC;', (session['id'], ))
    data = cur.fetchall()

    reporteList = []
    for row in data:
        reporteList.append( { "nombre": row[0], "total": row[1], "cantidad": row[2] } )
    
    cur.close()

    return jsonify(reporteList)

@app.route('/reportes/<int:idreport>', methods=['GET'])
def get_Report(idreport):
    try:
        params = {'id_usuario': session['id']}
        cur = mysql.connection.cursor()
        if idreport == 1:
            cur.execute('''SELECT
                                DATE(fecha) AS fecha,
                                SUM(total) AS monto_total
                            FROM venta
                            WHERE id_usuario = %s
                            GROUP BY DATE(fecha)
                            ORDER BY fecha
                            LIMIT 7;''', (session['id'],))
            data = cur.fetchall()

            reporteList = []
            for row in data:
                fecha = row[0]
                fecha_f = fecha.strftime("%d/%m/%Y")
                #responde sin modelo de clase
                reporteList.append( {"dia": fecha_f, "total": row[1] } ) 
            
            
            cur.close()

            return jsonify(reporteList)
        elif idreport == 2:
            cur.execute('''SELECT
                                categoria.nombre AS categoria,
                                COUNT(*) AS cantidad_ventas
                            FROM
                                detalle_venta
                                INNER JOIN producto ON detalle_venta.id_producto = producto.id
                                INNER JOIN categoria ON producto.id_categoria = categoria.id
                            WHERE producto.id_usuario = %s
                            GROUP BY categoria.nombre;''', (session['id'],))
            data = cur.fetchall()

            reporteList = []
            for row in data:
                #responde sin modelo de clase
                reporteList.append( {"categoria": row[0], "cantidad": row[1]} ) 
            
            
            cur.close()

            return jsonify(reporteList)
        elif idreport == 3:
            #* comodin en mysql
            cur.execute('''    SELECT
                                    DATE(v.fecha) AS fecha,
                                    COUNT(*) AS cantventas
                                FROM venta v
                                INNER JOIN detalle_venta dv ON v.id = dv.id_venta
                                INNER JOIN servicio s ON dv.id_servicio = s.id
                                WHERE v.fecha >= CURDATE() - INTERVAL 7 DAY
                                AND v.id_usuario = %s
                                GROUP BY DATE(fecha)
                                ORDER BY fecha;''', (session['id'],))
            data = cur.fetchall()

            reporteList = []
            for row in data:
                fecha = row[0]
                fecha_f = fecha.strftime("%d/%m/%Y")
                #responde sin modelo de clase
                reporteList.append( {"fecha": fecha_f, "cantidad": row[1]} ) 
            
            cur.close()
        return jsonify(reporteList)
    except Exception as e:
        print(e)
        return {"error en graficacion"}
