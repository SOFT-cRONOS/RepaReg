from flask import Blueprint, jsonify, request



#modelo
from models.sell import Sell, Sell_detail

sellHandle = Blueprint('sell', __name__)
#ver todos las sells
@sellHandle.route('/<int:id>', methods = ['GET','POST'])
def sells(id):
    if request.method == 'GET':
        try:
            sells = Sell.getAll()
            return jsonify(sells)
        except Exception as e:
            return jsonify( {"message": "error al encontrar ventas"} ), 400
        
    elif request.method == 'POST':
        data = []
        #lee el post
        #data[0] = request.get_json()["code"]
        data[1] = request.get_json()["n_factura"]
        data[2]  = request.get_json()["tipo"]
        data[3] = request.get_json()["fecha"]
        data[4] = request.get_json()["fecha_emision"]
        data[5] = request.get_json()["id_transaccion"]
        data[6] = request.get_json()["descuento"]
        data[7] = request.get_json()["subtotal"]
        data[8] = request.get_json()["id_cliente"]
        data[9] = request.get_json()["id_responsable"]
        data[10] = request.get_json()["estado_pago"]
        try:
            newventa = Sell.newSell(data)
            return jsonify(newventa)
        except Exception as e:
            return jsonify({"message":e})


@sellHandle.route('/<int:id>/<int:id_factura>', methods = ['GET','PUT'])
def sellsById(id, id_factura):
    if request.method == 'GET':
        try:
            #objSell = Sell()
            sells = Sell.getById(id_factura)
            return jsonify( sells )
        except Exception as e:
            return jsonify( {"message": "error"} ), 400
    
    elif request.method == 'PUT':
        pass


@sellHandle.route('/<int:id>/detail/<int:id_factura>', methods = ['GET','POST'])
def getDetaill(id, id_factura):
    if request.method == 'GET':
        try:
            #objSell = Sell()
            detailsells = Sell_detail.getDetail(id_factura)
            return jsonify( detailsells )
        except Exception as e:
            return jsonify( {"message": "error"} ), 400
    
    elif request.method == 'PUT':
        pass