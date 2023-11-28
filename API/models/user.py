class User():
    def __init__(self, row):
        self._id = row[0]
        self._cuit_cuil = row[1]
        self._nombre = row[2]
        self._apellido = row[3]
        #self._password = row[4]
        self._imagen = row[5]
        self._direccion = row[6]
        self._telefono = row[7]
        self._email = row[8]

    def to_json(self):
        return {
            "id": self._id,
            "cuit_cuil": self._cuit_cuil,
            "nombre" : self._nombre,
            "apellido": self._apellido,
            #"password": self._password,
            "imagen": self._imagen,
            "direccion": self._direccion,
            "telefono": self._telefono,
            "email": self._email,
        }
    
        