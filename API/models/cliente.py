from API.db.db import mysql, DBError

class Cliente():

    def __init__(self, row):
        self._id = row[0]
        self._nombre = row[1]
        self._apellido = row[2]
        self._cuit_cuil = row[3]
        self._direccion = row[4]
        self._email = row[5]
        self._telefono = row[6]


    def to_json(self):
        return {
            "id": self._id,
            "nombre": self._nombre,
            "apellido" : self._apellido,
            "cuit_cuil": self._cuit_cuil,
            "direccion": self._direccion,
            "email": self._email,
            "telefono": self._telefono,
        }    
    
    def cliente_existe(cuit_cuil):
        cur = mysql.connection.cursor()
        cur.execute('SELECT * FROM cliente WHERE cuit_cuil = %s', (cuit_cuil,))
        cur.fetchall()
        return cur.rowcount > 0

    def crear_cliente(data):
       
        if Cliente.cliente_existe(data["cuit_cuil"]):
            raise DBError("El cliente ya existe.")

        cur = mysql.connection.cursor()
        cur.execute('INSERT INTO cliente (nombre, apellido, cuit_cuil, direccion, email, telefono) VALUES (%s, %s, %s, %s, %s, %s)', (data["nombre"], data["apellido"], data["cuit_cuil"], data["direccion"], data["email"], data["telefono"]))
        mysql.connection.commit()
        if cur.rowcount > 0:
   
            cur.execute('SELECT LAST_INSERT_ID()')
            res = cur.fetchall()
            id = res[0][0]
            return {"message": "Cliente creado exitosamente", "id": id}
        
        raise DBError("Error al crear el cliente.")
     
    
    def modificar_cliente(id, data):
        cur = mysql.connection.cursor()
        cur.execute('UPDATE cliente SET nombre = %s, apellido = %s, cuit_cuil = %s, direccion = %s, email = %s, telefono = %s WHERE id = %s', (data["nombre"], data["apellido"], data["cuit_cuil"], data["direccion"], data["email"], data["telefono"], id))
        mysql.connection.commit()
        return {"message": "Cliente actualizado exitosamente"}            

    def eliminar_cliente(id):
        cur = mysql.connection.cursor()
        cur.execute('DELETE FROM cliente WHERE id = %s', (id,))
        mysql.connection.commit()
        return {"message": "Cliente eliminado exitosamente"}    