class Transaccion():
    def __init__(self, row):
        self._id_transaccion = row[0]
        self._tipo_trans = row[1] 
        self._estado = row[2]
        self._fecha_init = row[3]
        self._fecha_fin = row[4]
        self._id_responsable = row[5]
        self._id_item = row[6]
        self._informe = row[7]
        self._detalle = row[8]
        self._nombre_item = row[9]

    def to_json(self):
        return {
            "id_transaccion" : self._id_transaccion,
            "tipo_trans" : self._tipo_trans,
            "estado" : self._estado,
            "fecha_init" : self._fecha_init,
            "fecha_fin" : self._fecha_fin,
            "item" : self._nombre_item,
            "informe" : self._informe,
            "detalle" : self._detalle
        }
    
