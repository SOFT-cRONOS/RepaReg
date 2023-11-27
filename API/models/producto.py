from API.db.db import mysql, DBError
from flask import session 

class Producto():

    def __init__(self, row):
        self._id = row[0]
        self._nombre = row[1]
        self._id_categoria = row[2]
        self._id_usuario = row[3]
        self._stock = row[4]
        self._precio_compra = row[5]
        self._precio_venta = row[6]
        self._id_marca = row[7]
        self._marca = row[8]
        self._categoria = row[9]

    def to_json(self):
        return {
            "id": self._id,
            "nombre": self._nombre,
            "id_categoria" : self._id_categoria,
            "id_usuario": self._id_usuario,
            "stock": self._stock,
            "precio_compra": self._precio_compra,
            "precio_venta": self._precio_venta,
            "id_marca": self._id_marca,
            "marca": self._marca,
            "categoria": self._categoria,
        }    
    
    def producto_existe(nombre):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM producto WHERE nombre = %s', (nombre,))
        cur.fetchall()
        return cur.rowcount > 0

    def crear_producto(data):
       
        if Producto.producto_existe(data["nombre"]):
            raise DBError("El producto ya existe.")

        cur = mysql.connection.cursor()


        data["id_usuario"] = session['id'] 
        print( data["id_usuario"] )

        cur.execute('INSERT INTO producto (nombre, id_categoria, id_usuario, stock, precio_compra, precio_venta, id_marca) VALUES (%s, %s, %s, %s, %s, %s, %s)', (data["nombre"], data["id_categoria"], data["id_usuario"], data["stock"], data["precio_compra"], data["precio_venta"], data["id_marca"]))
        mysql.connection.commit()
        if cur.rowcount > 0:
            # get the id of the last inserted row
            cur.execute('SELECT LAST_INSERT_ID()')
            res = cur.fetchall()
            id = res[0][0]
            return {"message": "Producto creado exitosamente", "id": id}
        
        raise DBError("Error al crear el producto.")
     
    
    def modificar_producto(id, data):
        cur = mysql.connection.cursor()

        data["id_usuario"] = session['id'] 
        
        cur.execute('UPDATE producto SET nombre = %s, id_categoria = %s, id_usuario = %s, stock = %s, precio_compra = %s, precio_venta = %s, id_marca = %s WHERE id = %s', (data["nombre"], data["id_categoria"], data["id_usuario"], data["stock"], data["precio_compra"], data["precio_venta"], data["id_marca"], id))
        mysql.connection.commit()
        return {"message": "Producto actualizado exitosamente"}            

    def eliminar_producto(id):
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM producto WHERE id = %s', (id,))
        mysql.connection.commit()
        return {"message": "Producto eliminado exitosamente"}    