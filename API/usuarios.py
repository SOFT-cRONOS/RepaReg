class Client():
    def __init__(self, row):
        self._id_usuario = row[0]
        self._nick = row[1]
        self._cuit = row[2]
        self._cuil = row[3]
        self._nombre = row[4]
        self._apellido = row[5]
        self._pass = row[6]
        self._imagen = row[7]
        self._direccion = row[8]
        self._telefono = row[9]
        self._mail = row[10]

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