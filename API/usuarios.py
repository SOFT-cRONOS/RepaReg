class Client():
    def __init__(self, row):
        self._id_usuario = row[0]
        self._nick = row[2]
        self._cuit = row[3]
        self._cuil = row[4]
        self._nombre = row[5]
        self._apellido = row[6]
        self._pass = row[7]
        self._imagen = row[8]
        self._direccion = row[9]
        self._telefono = row[10]
        self._mail = row[11]

    def to_json(self):
        return {
            "id_usuario" : self._id_usuario,
            "nick" :self._nick,
            "cuit" :self._cuit,
            "cuil" :self._cuil,
            "nombre" :self._nombre,
            "apellido" :self._apellido,
            "pass" :self._pass,
            "imagen" :self._imagen,
            "direccion" :self._direccion,
            "telefono" :self._telefono,
            "mail" :self._mail
        }