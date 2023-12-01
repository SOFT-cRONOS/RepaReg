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

const btnNuevaVenta = document.getElementById('btn-nueva-venta');
const btnGuardarVenta = document.getElementById('btn-guardar-venta');

const btnCerrarModalVenta = document.getElementById('btn-cerrar-modal-venta');

const tipoDetalle = document.getElementById('tipo');
const tipoSelectProductoServicio = document.getElementById('producto-servicio');
const cantidad = document.getElementById('cantidad');
const precio = document.getElementById('precio');

function formatearFecha(fechaGMT) {
  // Crear un objeto Date a partir de la cadena de fecha
  const fecha = new Date(fechaGMT);

  // Obtener los componentes de la fecha
  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth() + 1; // Se agrega 1 ya que los meses en JavaScript van de 0 a 11
  const anio = fecha.getUTCFullYear();

  // Formatear la fecha en el formato "d/m/Y"
  const fechaFormateada = dia + '/' + mes + '/' + anio;

  return fechaFormateada;
}

function validarForm() {
  let isValid = true;

  const cliente = document.getElementById('cliente').value;

  if (cliente.trim().length === 0) {
    isValid = false;
  }

  if (detalleVenta.length === 0) {
    isValid = false;
  }

  if (!isValid) {
    alert('Error en los datos ingresados.');
  }

  return isValid;
}

function validarFormAgregarItemDetalle() {
  let isValid = true;

  const tipo = document.getElementById('tipo').value;
  const productoServicio = document.getElementById('producto-servicio').value;
  const cantidad = document.getElementById('cantidad').value;
  const precio = document.getElementById('precio').value;

  if (tipo == '-1') {
    isValid = false;
  }

  if (productoServicio == '-1') {
    isValid = false;
  }

  if (cantidad.trim().length == 0 || isNaN(cantidad) || cantidad <= 0) {
    isValid = false;
  }
  if (precio.trim().length == 0 || isNaN(precio) || precio <= 0) {
    isValid = false;
  }

  if (!isValid) {
    alert('Error en los datos ingresados.');
  }

  console.log(tipo, productoServicio, isValid);

  return isValid;
}

const tablaDetalleVenta = document.getElementById('detalle-venta');

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

const cargarSelectClientes = async () => {
  const authToken = getAuthToken();

  const url = `${URL_BASE}/clientes?authToken=${authToken}`;

  const response = await fetch(url);
  const clientes = await response.json();

  let html = '<option value="-1">Seleccione...</option>';

  clientes.forEach((cliente) => {
    html += `<option value="${cliente.id}">${cliente.nombre} ${cliente.apellido}</option>`;
  });

  document.getElementById('cliente').innerHTML = html;
};

const cambiarTipoItemDetalle = (event) => {
  const tipoItem = event.target.value;

  cargarSelectItems(tipoItem);
};

document
  .getElementById('tipo')
  .addEventListener('change', cambiarTipoItemDetalle);

const cargarSelectItems = async (tipoItem) => {
  const authToken = getAuthToken();

  let url = '';

  if (tipoItem == 1) {
    url = `${URL_BASE}/productos?authToken=${authToken}`;
  } else {
    url = `${URL_BASE}/servicios?authToken=${authToken}`;
  }

  const response = await fetch(url);
  const clientes = await response.json();

  let html = '<option value="-1">Seleccione...</option>';

  clientes.forEach((item) => {
    html += `<option value="${item.id}">${item.nombre}</option>`;
  });

  document.getElementById('producto-servicio').innerHTML = html;
};


//sacar precio de producto y establecer cantidad maxima
const SelectorItem = document.getElementById('producto-servicio')
document.getElementById('producto-servicio').addEventListener('change', cargarPrecio);
function cargarPrecio() {
  let id_producto = SelectorItem.value;
  const authToken = getAuthToken();
  const url = `${URL_BASE}/productos/${id_producto}?authToken=${authToken}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      precio.value = data.precio_venta;
      cantidad.value = 0;
      cantidad.max = data.stock
    })
    .catch(error => console.error('Error:', error));
  
  
}

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
              <td>${formatearFecha(venta.fecha)}</td>
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

  const data = await response.json();

  document.getElementById('cliente').value = data.id_cliente;

  detalleVenta = data.detalle;

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
  if (validarForm()) {
    const id_cliente = selectCliente.value;
    const total = detalleVenta.reduce(
      (acum, actual) =>
        acum + parseInt(actual.cantidad) * parseFloat(actual.precio),
      0
    );

    console.log(total);

    let url = `${URL_BASE}/ventas`;

    const authToken = getAuthToken();

    url += `?authToken=${authToken}`;

    const data = {
      id_cliente,
      detalle: detalleVenta,
      total,
    };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    await response.json();

    await obtenerVentas();

    modalVentas.hide();
  }
};

const editarVenta = () => {
  cambiarEstadoModal(MODOS_MODAL.edicion);
};

const cambiarEstadoModal = (nuevoModoModal) => {
  modoModal = nuevoModoModal;
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    idVentaSeleccionado = null;
    tituloModalVentas.innerHTML = 'Nueva Venta';

    detalleVenta = [];

    selectCliente.value = '-1';

    selectCliente.disabled = false;

    btnAgregarProductoServicio.style.display = 'block';
    btnGuardarVenta.style.display = 'block';
    btnCerrarModalVenta.innerHTML = 'Cancelar';
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalVentas.innerHTML = 'Ver Venta';

    selectCliente.disabled = true;

    btnAgregarProductoServicio.style.display = 'none';
    btnGuardarVenta.style.display = 'none';
    btnCerrarModalVenta.innerHTML = 'Cerrar';
  }

  dibujarDetalleVenta();
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

  document.getElementById('tipo').value = '-1';
  document.getElementById('producto-servicio').value = '-1';
  document.getElementById('cantidad').value = '';
  document.getElementById('precio').value = '';

  modalAgregarProductoServicio.show();
};

const cerrarModalAgregarProductoServicio = () => {
  modalAgregarProductoServicio.hide();
};

const eliminarItemDetalleVenta = (index) => {
  detalleVenta.splice(index, 1);
  dibujarDetalleVenta();
};

const dibujarDetalleVenta = () => {
  if (detalleVenta.length > 0) {
    let html = '';

    //Dibujar la tabla de detalle de ventas
    detalleVenta.forEach((item, i) => {
      html += `<tr>
              <td>${item.productoServicio}</td>
              <td>${item.cantidad}</td>
              <td>$ ${item.precio}</td>
              <td>$ ${parseInt(item.cantidad) * parseFloat(item.precio)}</td>
      
              ${
                modoModal === MODOS_MODAL.nuevo &&
                `<td>
                            <button data-index="${i}" class="btn btn-eliminar-item-detalle">
                              <span data-feather="trash"></span>
                            </button>
                          </td>`
              }
            </tr>`;
    });

    tablaDetalleVenta.innerHTML = html;

    const botonesEliminar = document.getElementsByClassName(
      'btn-eliminar-item-detalle'
    );

    for (const botonEliminar of botonesEliminar) {
      botonEliminar.addEventListener('click', (event) => {
        event.preventDefault();
        eliminarItemDetalleVenta(botonEliminar.getAttribute('data-index'));
      });
    }

    feather.replace();

    document.getElementById('detalle-tabla-container').style.display = 'block';
  } else {
    console.log('HEre..');
    document.getElementById('detalle-tabla-container').style.display = 'none';
  }

  cerrarModalAgregarProductoServicio();
};

const agregarDetalleVenta = () => {
  if (validarFormAgregarItemDetalle()) {
    const selectedIndex = tipoSelectProductoServicio.selectedIndex;

    const newDetalleVenta = {
      tipo: tipoDetalle.value,
      id_productoServicio: tipoSelectProductoServicio.value,
      cantidad: cantidad.value,
      precio: precio.value,
      productoServicio: tipoSelectProductoServicio.options[selectedIndex].text,
    };

    detalleVenta.push(newDetalleVenta);

    dibujarDetalleVenta();
  }
};

btnNuevaVenta.addEventListener('click', mostrarModalVentas);
btnGuardarVenta.addEventListener('click', guardarVenta);

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

cargarSelectClientes();
