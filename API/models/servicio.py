from API.db.db import mysql, DBError
from flask import session

class Servicio():

    def __init__(self, row):
        self._id = row[0]
        self._nombre = row[1]
        self._precio = row[2]
        self._descripcion = row[3]

    def to_json(self):
        return {
            "id": self._id,
            "nombre": self._nombre,
            "precio" : self._precio,
            "descripcion": self._descripcion,
        }    
    
    def servicio_existe(nombre):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM servicio WHERE nombre = %s', (nombre,))
        cur.fetchall()
        return cur.rowcount > 0

    def crear_servicio(data):
       
        if Servicio.servicio_existe(data["nombre"]):
            raise DBError("El servicio ya existe.")

        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO servicio (nombre, precio, descripcion, id_usuario) VALUES (%s, %s, %s, %s)', (data["nombre"], data["precio"], data["descripcion"], session['id']))
        mysql.connection.commit()
        if cur.rowcount > 0:
            cur.execute('SELECT LAST_INSERT_ID()')
            res = cur.fetchall()
            id = res[0][0]
            return {"message": "Servicio creado exitosamente", "id": id}
        
        raise DBError("Error al crear el servicio.")
     
    
    def modificar_servicio(id, data):
        cur = mysql.connection.cursor()
        cur.execute('UPDATE servicio SET nombre = %s, precio = %s, descripcion = %s WHERE id = %s', (data["nombre"], data["precio"], data["descripcion"], id))
        mysql.connection.commit()
        return {"message": "Servicio actualizado exitosamente"}            

    def eliminar_servicio(id):
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM servicio WHERE id = %s', (id,))
        mysql.connection.commit()
        return {"message": "Servicio eliminado exitosamente"}    
