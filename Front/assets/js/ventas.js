// ventas.js
//import { obtenerClientes, obtenerClientesporid } from '/clientes.js';

let GidProducto = 0;
const obtenerClientes = () => {
  const clientes = [
    {
      id: 15,
      nombre: "Steve Jobs",
      foto: "https://cdn-icons-png.flaticon.com/512/4792/4792929.png",
      dni: "58.256.3236",
      telefono: "11 6726-3106",
    },
    {
      id: 158,
      nombre: "Bill Gates",
      foto: "IMG",
      dni: "28.256.3236",
      telefono: "11 1122-6598",
    },
    {
      id: 358,
      nombre: "Richard Stallman",
      foto: "IMG",
      dni: "35.153.884",
      telefono: "11 2212-2356",
    },
    ,
    {
      id: 918,
      nombre: "Elon Musk",
      foto: "IMG",
      dni: "45.252.112",
      telefono: "11 3344-5566",
    },
  ];

  return clientes;

  //solicitud fetch
  // config de token
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token')

  const requestOptions = {
  method : 'GET',
  headers:{
      'Content-Type': 'application/json',
      'x-access-token': token,
      'user-id': id
      }
  }
  // fin config de token
  
  
  //link a items retorna la respuesta del back
  return fetch(`http://127.0.0.1:5000/user/${id}/client`, requestOptions)
  .then(
    resp => {return resp.json()
    })
  .catch(error => {
    console.error('Error al obtener los clientes:', error);
    throw error; // devuelve error
  }); 
};

const obtenerClientesporid = (id_cliente) => {
  const clientes =
    {
      id: 15,
      nombre: "Steve Jobs",
      apellido: "pedrito",
      foto: "https://cdn-icons-png.flaticon.com/512/4792/4792929.png",
      dni: "58.256.3236",
      telefono: "11 6726-3106",
    }

  return clientes;

  //solicitud fetch
  // config de token
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token')

  const requestOptions = {
  method : 'GET',
  headers:{
      'Content-Type': 'application/json',
      'x-access-token': token,
      'user-id': id
      }
  }
  // fin config de token
  
  
  //link a items retorna la respuesta del back
  return fetch(`http://localhost:5200/user/${id}/client/${id_cliente}`, requestOptions)
  .then(
    resp => {return resp.json()
    })
  .catch(error => {
    console.error('Error al obtener los clientes:', error);
    throw error; // devuelve error
  }); 
};

const getProduct = () => {
    const productos = [
      {
        id: 15,
        nombre: "Monitor Samsung",
        precioCompra: 2530000,
        precioVenta: 2930000,
        stock: 5,
        marca: "Samsung",
        categoria: "Computación",
      },
      {
        id: 235,
        nombre: "Notebook Lenovo",
        precioCompra: 8565000,
        precioVenta: 9565000,
        stock: 2,
        marca: "Lenovo",
        categoria: "Computación",
      },
      {
        id: 38,
        nombre: "Webcam LG",
        precioCompra: 5565000,
        precioVenta: 6565000,
        stock: 20,
        marca: "LG",
        categoria: "Computación",
      },
      {
        id: 49,
        nombre: "Mouse Logitech",
        precioCompra: 4565000,
        precioVenta: 8565000,
        stock: 29,
        marca: "Logitech",
        categoria: "Computación",
      },
      {
        id: 545,
        nombre: "Teclado Microsoft",
        precioCompra: 965000,
        precioVenta: 1065000,
        stock: 35,
        marca: "Microsoft",
        categoria: "Computación",
      },
      {
        id: 621,
        nombre: "Mouse Genius",
        precioCompra: 865000,
        precioVenta: 965000,
        stock: 152,
        marca: "Genius",
        categoria: "Computación",
      },
      {
        id: 70,
        nombre: "Audi A4",
        precioCompra: 8650000000,
        precioVenta: 9650000000,
        stock: 4,
        marca: "Audi",
        categoria: "Vehiculos",
      },
    ];
    
    return productos
};

const getProductbyId = (id_producto) => {
    const producto ={
            id: 15,
            nombre: "Monitor Samsung",
            precioCompra: 2530000,
            precioVenta: 2930000,
            stock: 5,
            marca: "Samsung",
            categoria: "Computación",
            };
  
    return producto;
  
    //solicitud fetch
    // config de token
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token')
  
    const requestOptions = {
    method : 'GET',
    headers:{
        'Content-Type': 'application/json',
        'x-access-token': token,
        'user-id': id
        }
    }
    // fin config de token
    
    
    //link a items retorna la respuesta del back
    return fetch(`http://127.0.0.1:5000/prdocut/${id}/${id_producto}`, requestOptions)
    .then(
      resp => {return resp.json()
      })
    .catch(error => {
      console.error('Error al obtener el producto:', error);
      throw error; // devuelve error
    }); 
  };

const loadtableproduct = () => {
    const datosTabla = document.getElementById("datos-tabla-addproducto");
    const productos = getProduct();
    let html = "";
  
    //Dibujar la tabla de productos
    productos.forEach((producto) => {
      html += `<tr>
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>${producto.categoria}</td>
                <td>$ ${producto.precioVenta}</td>
                <td>${producto.stock}</td>
              </tr>`;
    });
  
    datosTabla.innerHTML = html;
}

const getDatasell = () => {
  //carga los datos de la venta seleccionada en ventana
}

const showmodaladdproduct = () => {
    loadtableproduct();  
    modaladdproducto.show();
}

const getSells = () => {
  const tester = [
    {
      "cliente": {
        "apellido_cliente": "testeo",
        "direccion_cliente": "colon 104",
        "nombre_cliente": "persona",
        "telefono_cliente": 123
      },
      "descuento": "1200.00",
      "estado_pago": "pagado",
      "fecha": "Fri, 24 Nov 2023 00:00:00 GMT",
      "fecha_emision": "Fri, 24 Nov 2023 00:00:00 GMT",
      "id_cliente": 2,
      "id_factura": 1,
      "id_responsable": 1,
      "id_transaccion": "0.00",
      "n_factura": 1,
      "responsable": {
        "nombre_responsable": "persona"
      },
      "subtotal": "1200.00",
      "tipo": "c"
    }
  ]
  return tester  
  //solicitud fetch
  // config de token
  //const id = localStorage.getItem('id');
  const id = 1;
  //const token = localStorage.getItem('token')

  const requestOptions = {
  method : 'GET'
  // headers:{
  //     'Content-Type': 'application/json',
  //     'x-access-token': token,
  //     'user-id': id
  //     }
  }
  // fin config de token
  
  //link a items retorna la respuesta del back
  return fetch(`http://127.0.0.1:5000/sell/${id}`, requestOptions)
  .then(
    resp => {return resp.json()
    })
  .catch(error => {
    console.error('Error al obtener los clientes:', error);
    throw error; // devuelve error
  }); 
}

const loadtableslastsell = () => {
  const datosTabla = document.getElementById("datos-tabla-lastsells");
  const lastsells = getSells();
  let html = "";

  //Dibujar la tabla de productos
  lastsells.forEach((lastsell) => {
    html += `<tr>
              <td>${lastsell.n_factura}</td>
              <td>${lastsell.fecha_emision}</td>
              <td>${lastsell.subtotal}</td>
            </tr>`;
  });
  datosTabla.innerHTML = html;
}

const showmodallastsell = () => {
  loadtableslastsell();  
  modallastsell.show();
}

const addproduct_to_sell = () => {
    //consultar el GidProducto con fetch
    const producto = getProductbyId(GidProducto);

    // Crea una nueva fila y agrega celdas
    var newRow = tablaselldetail.insertRow();
    var number = newRow.insertCell(0);
    var product = newRow.insertCell(1);
    var price = newRow.insertCell(2);
    var unit = newRow.insertCell(2);
    var total = newRow.insertCell(2);


    // Agrega el contenido a las celdas (puedes ajustar esto según tus necesidades)
    number.innerHTML = producto.id;
    product.innerHTML = producto.nombre;
    price.innerHTML = producto.precioCompra;
    unit.innerHTML = 1;
    total.innerHTML = price * unit;

    closemodaladdproduct()
}

const closemodaladdproduct = () => {
    modaladdproducto.hide();
}

const closemodallastsell = () => {
  modallastsell.hide();
}
//cerrar la venta
const finishSell = () => {
    //Lee cliente y guarda venta
    
    //Lee la tabla y lo carga en un json
    const tabla = document.querySelector('#tabla-detalle');
    const filas = tabla.querySelectorAll('tbody tr');

    // Crear un array para almacenar los datos
    const datos = [];

    // Iterar sobre las filas, extrae datos y los manda a guardar
    filas.forEach((fila) => {
      const celdas = fila.querySelectorAll('td');

      // Crear un objeto con los datos y agregarlo al array
      const filaDatos = {
        numero: celdas[0].textContent,
        articulo: celdas[1].textContent,
        precio: celdas[2].textContent,
        cantidad: celdas[3].textContent,
        subtotal: celdas[4].textContent
      };

      //datos.push(filaDatos);
      // Convertir a formato JSON
      const filaDatosJson = JSON.stringify(filaDatos);
      console.log(filaDatosJson);

      //manda cada renglon al fetch
      saveSelldetail(filaDatosJson);

    });
} 

const saveSelldetail = (Datos) => {
    //aca deveria ejecutar fectch para guardar venta
    const requestOptions = {
      method : 'POST',
      headers:{
          'Content-Type': 'application/json',
          'x-access-token': token,
          'user-id': id
          },
      body: Datos,
    }
  fetch(`http://127.0.0.1:4500/client/${id}/save`, requestOptions)
  .then(
  resp => {
      return resp.json()
  })
  .then(resp => {
      console.log(resp)
  })
}

//boton finalizar venta
const btnfinsell = document.getElementById("btn-fin-sell");
btnfinsell.addEventListener("click", finishSell)
//boton cancelar venta
const btncanceladdproduc = document.getElementById("btn-canceladdproduc");
btncanceladdproduc.addEventListener("click", closemodaladdproduct);

//datos de encabezado factura
const clientSpan = document.getElementById('dataclient');
const dirSpan = document.getElementById('datadireccion');
const phoneSpan = document.getElementById('datatelefono');

//Drop select tipo pago
const dropModcash = document.getElementById("select-modpago");
dropModcash.addEventListener("click", function () {
  const modCash = this.options[this.selectedIndex].value;
  console.log(modCash)
})

//select cliente desplegable
const dropClient = document.getElementById("select-client");
dropClient.addEventListener("change", function () {
  //Obtiene datos del cliente
  const id_cliente = this.options[this.selectedIndex].value;
  const client = obtenerClientesporid(id_cliente);
  // Actualizar el contenido del span con el valor seleccionado del select
  clientSpan.innerText = client.nombre;
  dirSpan.innerText = client.direccion;
  phoneSpan.innerText = client.telefono;
});

//botones y modal de ultimas ventas
const modallastsell = new bootstrap.Modal("#modal-lastsells");

const btnseesell = document.getElementById("btn-seesell");
btnseesell.addEventListener("click", getDatasell)
const btnexitlastsell = document.getElementById("btn-exitlastsell")
btnexitlastsell.addEventListener("click", closemodallastsell)


//botones y modal de agregar producto a venta
const btnokaddproduc = document.getElementById("btn-okaddproduc");
btnokaddproduc.addEventListener("click", addproduct_to_sell);

//botones barra superior
const btnaddproducto = document.getElementById("btn-modal-addproducto");
btnaddproducto.addEventListener("click", showmodaladdproduct);
const modaladdproducto = new bootstrap.Modal("#modal-addproducto");
const btnlastsells = document.getElementById("btn-modal-lastsells");
btnlastsells.addEventListener("click", showmodallastsell);

//tabla productos 
const tablaselldetail = document.getElementById('datos-tabla-detalleventa');
const tablaproduct = document.getElementById('datos-tabla-addproducto');

tablaproduct.addEventListener('click', function (e) {
    // Verificamos si el clic fue en una fila
    if (e.target.tagName === 'TD') {
      // elimina la clase de todas las filas para reiniciar el estilo
      var filas = tablaproduct.getElementsByTagName('tr');
      for (var i = 0; i < filas.length; i++) {
        filas[i].classList.remove('row-selected');
      }

      //agrega la clase a la fila seleccionada
      var fila = e.target.parentElement;
      fila.classList.add('row-selected');

      // le el valor de la primer columna y lo mostramos en la consola
      GidProducto = fila.cells[0].textContent;
      console.log("producto seleccionado:", GidProducto)
    }
  });


