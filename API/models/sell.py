#bd
from db.BDconfig import *

class Sell():
    def __init__(self, row):
        self.id_factura = row[0]
        self.n_factura = row[1]
        self.tipo = row[2]
        self.fecha = row[3]
        self.fecha_emision = row[4]
        self.id_transaccion = row[5]
        self.descuento = row[6]
        self.subtotal = row[7]
        self.id_cliente = row[8]
        self.id_responsable = row[9]
        self.estado_pago = row[10]

        #campos cliente
        self.nombre_cliente = row[11]
        self.apellido_cliente = row[12]
        self.direccion_cliente = row[13]
        self.telefono_cliente = row[14]

        #campos responsable
        self.nombre_responsable = row[15]

    def to_json(self):
        return {
        "id_factura" : self.id_factura,
        "n_factura" : self.n_factura,
        "tipo" : self.tipo,
        "fecha" : self.fecha,
        "fecha_emision" : self.fecha_emision,
        "id_transaccion" : self.id_transaccion,
        "descuento" : self.descuento,
        "subtotal" : self.subtotal,
        "id_cliente" : self.id_cliente,
        "id_responsable" : self.id_responsable,
        "estado_pago" : self.estado_pago,
        "cliente": {
            "nombre_cliente" : self.nombre_cliente,
            "apellido_cliente" : self.apellido_cliente,
            "direccion_cliente" : self.direccion_cliente,
            "telefono_cliente" : self.telefono_cliente
        },
        "responsable": {
            "nombre_responsable" : self.nombre_responsable,
        }
        } 

    #create
    def newSell(data):
        n_factura = data[1]
        tipo = data[2]
        fecha = data[3]
        fecha_emision = data[4]
        id_transaccion = data[5]
        descuento = data[6]
        subtotal = data[7]
        id_cliente = data[8]
        id_responsable = data[9]
        estado_pago = data[10]
        return data

    #geters
    def getAll():
        try:
            cur = mysql.cursor()
            cur.execute('''SELECT 
            f.id_factura,
            f.n_factura,
            f.tipo,
            f.fecha,
            f.fecha_emision,
            f.descuento,
            f.subtotal,
            f.total,
            f.id_cliente,
            f.id_responsable,
            f.estado_pago,
            c.nombre AS nombre_cliente,
            c.apellido AS apellido_cliente,
            c.direccion AS direccion_cliente,
            c.telefono AS telefono_cliente,
            u.nombre AS nombre_responsable,
            u.apellido AS apellido_responsable,
            u.direccion AS direccion_responsable,
            u.telefono AS telefono_responsable
            FROM  factura f
            INNER JOIN usuario c ON f.id_cliente = c.id_usuario
            INNER JOIN usuario u ON f.id_responsable = u.id_usuario;''')
            data = cur.fetchall()
            print(cur.rowcount)
            print(data)
            items = []
            for row in data:
                objSell = Sell(row)
                items.append(objSell.to_json())
            return items
        finally:
            cur.close()  

    def getById(id_factura):
        try:
            cur = mysql.cursor()
            cur.execute('''SELECT 
            f.id_factura,
            f.n_factura,
            f.tipo,
            f.fecha,
            f.fecha_emision,
            f.descuento,
            f.subtotal,
            f.total,
            f.id_cliente,
            f.id_responsable,
            f.estado_pago,
            c.nombre AS nombre_cliente,
            c.apellido AS apellido_cliente,
            c.direccion AS direccion_cliente,
            c.telefono AS telefono_cliente,
            u.nombre AS nombre_responsable,
            u.apellido AS apellido_responsable,
            u.direccion AS direccion_responsable,
            u.telefono AS telefono_responsable
            FROM  factura f
            INNER JOIN usuario c ON f.id_cliente = c.id_usuario
            INNER JOIN usuario u ON f.id_responsable = u.id_usuario
            WHERE id_factura = {0}'''.format(id_factura))
            data = cur.fetchall()
            print(cur.rowcount)
            print(data)
            items = []
            for row in data:
                objSell = Sell(row)
                items.append(objSell.to_json())
            return items
        finally:
            cur.close()

class Sell_detail():
    def __init__(self, row):
        self.id_factura = row[0]
        self.id_rep = row[1]
        self.id_producto = row[2]
        self.detalle = row[3]
        self.cantidad = row[4]
        self.precio_unit = row[5]
        self.descuento_unit = row[6]
        #campos producto
        self.nombre_articulo = row[7]
        #campos categoria producto
        self.categoria = row[8]


    def to_json(self):
        return {
        "id_factura" : self.id_factura,
        "id_rep" : self.id_rep,
        "id_producto" : self.id_producto,
        "detalle" : self.detalle,
        "cantidad" : self.cantidad,
        "precio_unit" : self.precio_unit,
        "descuento_unit" : self.descuento_unit,
        "producto" : {
            "nombre_articulo" : self.nombre_articulo,
            "categoria" : self.categoria
        }
        }
    
    def getDetail(id_factura):
        try:
            cur = mysql.cursor()
            cur.execute('''
                SELECT
                    df.id_factura,
                    df.id_rep,
                    df.id_producto,
                    df.detalle,
                    df.cantidad,
                    df.precio_unit,
                    df.descuento_unit,
                    p.nombre_articulo AS nombre_producto,
                    c.nombre_cat AS categoria_producto
                FROM
                    detalle_factura df
                INNER JOIN
                    producto p ON df.id_producto = p.id_producto
                INNER JOIN
                    categoria c ON p.id_categoria = c.id_categoria
                WHERE
                    df.id_factura = {0}'''.format(id_factura))
            data = cur.fetchall()
            print(cur.rowcount)
            print(data)
            items = []
            for row in data:
                objDSell = Sell_detail(row)
                items.append(objDSell.to_json())
            return items
        finally:
            cur.close()    