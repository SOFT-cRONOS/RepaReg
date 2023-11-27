<<<<<<< HEAD
let idVentaSeleccionado = null;

let detalleVenta = [];

const URL_BASE = 'http://localhost:5200';

const MODOS_MODAL = {
  nuevo: 'nuevo',
  ver: 'ver',
  edicion: 'edicion',
};

let modoModal = MODOS_MODAL.nuevo;

const modalVentas = new bootstrap.Modal('#modal-ventas');
const modalAgregarProductoServicio = new bootstrap.Modal(
  '#modal-agregar-producto-servicio'
);

const btnEditarVenta = document.getElementById('btn-editar-venta');

const btnNuevaVenta = document.getElementById('btn-nueva-venta');
const btnGuardarVenta = document.getElementById('btn-guardar-venta');
const btnBuscarVenta = document.getElementById('btn-buscar-venta');
const btnCerrarModalVenta = document.getElementById('btn-cerrar-modal-venta');

const btnAgregarDetalleVenta = document.getElementById(
  'btn-agregar-a-detalle-venta'
);

const btnCerrarMmodalAgregarProductoServicio = document.getElementById(
  'btn-cerrar-modal-agregar-producto-servicio'
);

const btnAgregarProductoServicio = document.getElementById(
  'btn-agregar-producto-servicio'
);

const selectCliente = document.getElementById('cliente');

const tituloModalVentas = document.getElementById('titulo-modal-ventas');

const obtenerVentas = async () => {
  const authToken = getAuthToken();

  const url = `${URL_BASE}/ventas?authToken=${authToken}`;

  const response = await fetch(url);
  const data = await response.json();

  mostrarVentasEnTabla(data);
};

const mostrarVentasEnTabla = (ventas) => {
  const datosTabla = document.getElementById('datos-tabla');

  let html = '';

  //Dibujar la tabla de ventas
  ventas.forEach((venta) => {
    html += `<tr>
              <td>${venta.id}</td>
              <td>${venta.cliente}</td>
              <td>${venta.fecha}</td>
              <td>$ ${venta.total}</td>

              <td>
                <button data-id-venta="${venta.id}" class="btn btn-ver" >
                  <span data-feather="eye"></span>Ver
                </button>

                <button data-id-venta="${venta.id}" class="btn btn-eliminar">
                  <span data-feather="trash"></span>Eliminar
                </button>
              </td>
            </tr>`;
  });

  datosTabla.innerHTML = html;

  const botonesVer = document.getElementsByClassName('btn-ver');
  const botonesEliminar = document.getElementsByClassName('btn-eliminar');

  for (const botonVer of botonesVer) {
    botonVer.addEventListener('click', mostrarModalDetalleVenta);
  }

  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener('click', eliminarVenta);
  }

  feather.replace();
};

const mostrarModalDetalleVenta = async (event) => {
  const idVenta = event.target.getAttribute('data-id-venta');

  idVentaSeleccionado = idVenta;

  const authToken = getAuthToken();

  const url = `${URL_BASE}/ventas/${idVenta}?authToken=${authToken}`;

  const response = await fetch(url);
  const { nombre, precio_compra, precio_venta, stock, id_categoria, id_marca } =
    await response.json();

  inputNombre.value = nombre;
  inputPrecioCompra.value = precio_compra;
  inputPrecioVenta.value = precio_venta;
  inputStock.value = stock;
  selectCategoria.value = id_categoria;
  selectMarca.value = id_marca;

  cambiarEstadoModal(MODOS_MODAL.ver);
  modalVentas.show();
};

const eliminarVenta = (event) => {
  const idVenta = event.target.getAttribute('data-id-venta');

  Swal.fire({
    text: '¿Realmente desde eliminar la venta?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#77669d',
    cancelButtonColor: '#b9b8c9',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const authToken = getAuthToken();

      const url = `${URL_BASE}/ventas/${idVenta}?authToken=${authToken}`;

      const response = await fetch(url, {
        method: 'DELETE',

        headers: { 'Content-Type': 'application/json' },
      });

      await response.json();

      obtenerVentas();
    }
  });
};

const mostrarModalVentas = () => {
  cambiarEstadoModal(MODOS_MODAL.nuevo);
  modalVentas.show();
};

const guardarVenta = async () => {
  const nombre = document.getElementById('nombre').value;
  const id_categoria = document.getElementById('categoria').value;
  const id_marca = document.getElementById('marca').value;
  const precio_compra = document.getElementById('precio-compra').value;
  const precio_venta = document.getElementById('precio-venta').value;
  const stock = document.getElementById('stock').value;

  let url = `${URL_BASE}/ventas`;
  let method = 'POST';

  if (modoModal === MODOS_MODAL.edicion) {
    url += `/${idVentaSeleccionado}`;
    method = 'PUT';
  }

  const authToken = getAuthToken();

  url += `?authToken=${authToken}`;

  const data = {
    nombre,
    id_categoria,
    id_marca,
    precio_compra,
    precio_venta,
    stock,
  };

  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  await response.json();

  await obtenerVentas();

  modalVentas.hide();
};

const buscarVenta = () => {
  const cajaBusqueda = document.getElementById('caja-busqueda');

  const textoBuscado = cajaBusqueda.value;

  console.log('Buscar la venta...', textoBuscado);
};

const editarVenta = () => {
  cambiarEstadoModal(MODOS_MODAL.edicion);
};

const cambiarEstadoModal = (nuevoModoModal) => {
  modoModal = nuevoModoModal;
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    idVentaSeleccionado = null;
    tituloModalVentas.innerHTML = 'Nueva Venta';

    selectCliente.value = '-1';

    selectCliente.disabled = false;

    btnEditarVenta.style.display = 'none';
    btnGuardarVenta.style.display = 'block';
    btnCerrarModalVenta.innerHTML = 'Cancelar';
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalVentas.innerHTML = 'Ver Venta';

    selectCliente.disabled = true;

    btnEditarVenta.style.display = 'block';
    btnGuardarVenta.style.display = 'none';
    btnCerrarModalVenta.innerHTML = 'Cerrar';
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalVentas.innerHTML = 'Editar Venta';

    selectCliente.disabled = false;

    btnEditarVenta.style.display = 'none';
    btnCerrarModalVenta.innerHTML = 'Cancelar';
    btnGuardarVenta.style.display = 'block';
  }
};

const handleCerrarModal = () => {
  console.log({ modoModal });
  if (modoModal === MODOS_MODAL.nuevo || modoModal === MODOS_MODAL.ver) {
    modalVentas.hide();
  } else {
    //Esta en modo edicion
    cambiarEstadoModal(MODOS_MODAL.ver);
  }
};

const handleMostrarModalAgregarProductoServicio = (event) => {
  event.preventDefault();

  modalAgregarProductoServicio.show();
};

const cerrarModalAgregarProductoServicio = (event) => {
  event.preventDefault();

  modalAgregarProductoServicio.hide();
};

const agregarDetalleVenta = () => {
  /* id = cantidad, precioUnit, tipo

  console.log('Agregar detalle', id, cantidad, precioUnit, tipo); */
};

btnNuevaVenta.addEventListener('click', mostrarModalVentas);
btnGuardarVenta.addEventListener('click', guardarVenta);
btnBuscarVenta.addEventListener('click', buscarVenta);

btnEditarVenta.addEventListener('click', editarVenta);

btnCerrarModalVenta.addEventListener('click', handleCerrarModal);

btnAgregarProductoServicio.addEventListener(
  'click',
  handleMostrarModalAgregarProductoServicio
);

btnCerrarMmodalAgregarProductoServicio.addEventListener(
  'click',
  cerrarModalAgregarProductoServicio
);

btnAgregarDetalleVenta.addEventListener('click', agregarDetalleVenta);

obtenerVentas();
=======
// ventas.js
//import { obtenerClientes, obtenerClientesporid } from '/clientes.js';

let GidProducto = 0;
let Gid_cliente = 0;
let GmodCash = "";

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
  //return tester  
  //solicitud fetch
  // config de token
  //const id = localStorage.getItem('id');
  const id = 1;
  //const token = localStorage.getItem('token')

  const requestOptions = {
  method : 'GET',
  headers:{
       'Content-Type': 'application/json'
       //'x-access-token': token,
       //'user-id': id
       }
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
  getSells()
  .then(resp => {
    let html = "";

    //Dibujar la tabla de productos
    resp.forEach((row) => {
      html += `<tr>
                <td>${row.n_factura}</td>
                <td>${row.fecha_emision}</td>
                <td>${row.subtotal}</td>
              </tr>`;
    });
    datosTabla.innerHTML = html;
  })
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
    
    //Lee la tabla detalle 
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

      //agrega la filla al array
      datos.push(filaDatos);
      // Convertir a formato JSON
    });
    //convierte la tabla detalle a json
    const sellDetails = JSON.stringify(datos);
    

    //Lee el encabezado de factura:
    const datosFactura = JSON.stringify({
      n_factura: "24124",
      tipo: "c",
      fecha: new Date(),
      fecha_emision: new Date(),
      id_transaccion: null,
      descuento: 0,
      subtotal: 2000,
      id_cliente: Gid_cliente,
      id_responsable: 1,
      estado_pago: "pagado",
      detalle: sellDetails
    })
    //console.log(datosFactura);
    saveSell(datosFactura);

} 

const saveSell = (Datos) => {
    //aca deveria ejecutar fectch para guardar venta
    const id = 1;
    const requestOptions = {
      method : 'POST',
      headers:{
          'Content-Type': 'application/json',
          //'x-access-token': token,
          'user-id': id
          },
      body: Datos,
    }
  fetch(`http://127.0.0.1:5000/sell/${id}`, requestOptions)
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
  GmodCash = this.options[this.selectedIndex].value;
  console.log(GmodCash)
})

//select cliente desplegable

const dropClient = document.getElementById("select-client");
dropClient.addEventListener("change", function () {
  //Obtiene datos del cliente
  Gid_cliente = this.options[this.selectedIndex].value;
  console.log(Gid_cliente);
  const client = obtenerClientesporid(Gid_cliente);
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


>>>>>>> 8b7bb835fc903e8b3ff1f9c9f69255d05982edf8
