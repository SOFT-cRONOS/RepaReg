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
