from API.db.db import mysql, DBError
from flask import session

class Venta():

    def __init__(self, row):
        self._id = row[0]
        self._id_usuario = row[1]
        self._fecha = row[2]
        self._id_cliente = row[3]
        self._total = row[4]
        self._cliente = row[5]

    def to_json(self):
        return {
            "id": self._id,
            "id_usuario": self._id_usuario,
            "fecha" : self._fecha,
            "id_cliente": self._id_cliente,
            "total": self._total,
            "cliente": self._cliente,
        }    
    

    def crear_venta(data):

        id_usuario =  session['id'] 
        

        data["id_cliente"]

        print("detalle", data["detalle"])

        cur = mysql.connection.cursor()

        cur.execute('INSERT INTO venta (id_usuario, id_cliente, total) VALUES (%s, %s, %s)', (id_usuario, data["id_cliente"], data["total"]))

        if cur.rowcount > 0:
            cur.execute('SELECT LAST_INSERT_ID()')
            res = cur.fetchall()
            id = res[0][0]

            mysql.connection.commit()

            """ Guardo el detalle """
            for producto in data["detalle"]:   
                print("aca", id)             
                if ( int(producto["tipo"]) == 1 ):
                    """ Producto """
                    print("producto", producto["id_productoServicio"])  
                    cur.execute('INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unit) VALUES (%s, %s, %s, %s)', (id, producto["id_productoServicio"], producto["cantidad"], producto["precio"]))
                else:
                    """ Servicio """
                    print("servicio", producto["id_productoServicio"])  
                    cur.execute('INSERT INTO detalle_venta (id_venta, id_servicio, cantidad, precio_unit) VALUES (%s, %s, %s, %s)', (id, producto["id_productoServicio"], producto["cantidad"], producto["precio"]))
                
                
            mysql.connection.commit()

            return {"message": "Venta creada exitosamente", "id": id}
        
        raise DBError("Error al guardar la venta.")
              

    def eliminar_venta(id):
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM venta WHERE id = %s', (id,))
        mysql.connection.commit()
        return {"message": "Venta eliminada exitosamente"}    
