let idProductoSeleccionado = null;

const URL_BASE = 'http://localhost:5200';

const MODOS_MODAL = {
  nuevo: 'nuevo',
  ver: 'ver',
  edicion: 'edicion',
};

let modoModal = MODOS_MODAL.nuevo;

const modalProductos = new bootstrap.Modal('#modal-productos');

const btnEditarProducto = document.getElementById('btn-editar-producto');

const btnNuevoProducto = document.getElementById('btn-nuevo-producto');
const btnGuardarProducto = document.getElementById('btn-guardar-producto');
const btnBuscarProducto = document.getElementById('btn-buscar-producto');
const btnCerrarModalProducto = document.getElementById(
  'btn-cerrar-modal-producto'
);

const inputNombre = document.getElementById('nombre');
const inputPrecioCompra = document.getElementById('precio-compra');
const inputPrecioVenta = document.getElementById('precio-venta');
const inputStock = document.getElementById('stock');
const selectCategoria = document.getElementById('categoria');
const selectMarca = document.getElementById('marca');

const tituloModalProductos = document.getElementById('titulo-modal-productos');

const obtenerProductos = async () => {
  const authToken = getAuthToken();

  const url = `${URL_BASE}/productos?authToken=${authToken}`;

  const response = await fetch(url);
  const data = await response.json();

  mostrarProductosEnTabla(data);
};

const mostrarProductosEnTabla = (productos) => {
  const datosTabla = document.getElementById('datos-tabla');

  let html = '';

  //Dibujar la tabla de productos
  productos.forEach((producto) => {
    html += `<tr>
              <td>${producto.nombre}</td>
              <td>${producto.categoria}</td>
              <td>${producto.marca}</td>
              <td>$ ${producto.precio_compra}</td>
              <td>$ ${producto.precio_venta}</td>
              <td>${producto.stock}</td>

              <td>
                <button data-id-producto="${producto.id}" class="btn btn-ver" >
                  <span data-feather="eye"></span>Ver
                </button>

                <button data-id-producto="${producto.id}" class="btn btn-eliminar">
                  <span data-feather="trash"></span>Eliminar
                </button>
              </td>
            </tr>`;
  });

  datosTabla.innerHTML = html;

  const botonesVer = document.getElementsByClassName('btn-ver');
  const botonesEliminar = document.getElementsByClassName('btn-eliminar');

  for (const botonVer of botonesVer) {
    botonVer.addEventListener('click', mostrarModalDetalleProducto);
  }

  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener('click', eliminarProducto);
  }

  feather.replace();
};

const mostrarModalDetalleProducto = async (event) => {
  const idProducto = event.target.getAttribute('data-id-producto');

  idProductoSeleccionado = idProducto;

  const authToken = getAuthToken();

  const url = `${URL_BASE}/productos/${idProducto}?authToken=${authToken}`;

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
  modalProductos.show();
};

const eliminarProducto = (event) => {
  const idProducto = event.target.getAttribute('data-id-producto');

  Swal.fire({
    text: '¿Realmente desde eliminar el producto?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#77669d',
    cancelButtonColor: '#b9b8c9',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const authToken = getAuthToken();

      const url = `${URL_BASE}/productos/${idProducto}?authToken=${authToken}`;

      const response = await fetch(url, {
        method: 'DELETE',

        headers: { 'Content-Type': 'application/json' },
      });

      await response.json();

      obtenerProductos();
    }
  });
};

const mostrarModalProductos = () => {
  cambiarEstadoModal(MODOS_MODAL.nuevo);
  modalProductos.show();
};

const guardarProducto = async () => {
  const nombre = document.getElementById('nombre').value;
  const id_categoria = document.getElementById('categoria').value;
  const id_marca = document.getElementById('marca').value;
  const precio_compra = document.getElementById('precio-compra').value;
  const precio_venta = document.getElementById('precio-venta').value;
  const stock = document.getElementById('stock').value;

  let url = `${URL_BASE}/productos`;
  let method = 'POST';

  if (modoModal === MODOS_MODAL.edicion) {
    url += `/${idProductoSeleccionado}`;
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

  await obtenerProductos();

  modalProductos.hide();
};

const buscarProducto = () => {
  const cajaBusqueda = document.getElementById('caja-busqueda');

  const textoBuscado = cajaBusqueda.value;

  console.log('Buscar el producto...', textoBuscado);
};

const editarProducto = () => {
  cambiarEstadoModal(MODOS_MODAL.edicion);
};

const cambiarEstadoModal = (nuevoModoModal) => {
  modoModal = nuevoModoModal;
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    idProductoSeleccionado = null;
    tituloModalProductos.innerHTML = 'Nuevo Producto';

    inputNombre.value = '';
    inputPrecioCompra.value = '';
    inputPrecioVenta.value = '';
    inputStock.value = '';
    selectCategoria.value = '-1';
    selectMarca.value = '-1';

    inputNombre.disabled = false;
    inputPrecioCompra.disabled = false;
    inputPrecioVenta.disabled = false;
    inputStock.disabled = false;
    selectCategoria.disabled = false;
    selectMarca.disabled = false;

    btnEditarProducto.style.display = 'none';
    btnGuardarProducto.style.display = 'block';
    btnCerrarModalProducto.innerHTML = 'Cancelar';
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalProductos.innerHTML = 'Ver Producto';

    inputNombre.disabled = true;
    inputPrecioCompra.disabled = true;
    inputPrecioVenta.disabled = true;
    inputStock.disabled = true;
    selectCategoria.disabled = true;
    selectMarca.disabled = true;

    btnEditarProducto.style.display = 'block';
    btnGuardarProducto.style.display = 'none';
    btnCerrarModalProducto.innerHTML = 'Cerrar';
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalProductos.innerHTML = 'Editar Producto';

    inputNombre.disabled = false;
    inputPrecioCompra.disabled = false;
    inputPrecioVenta.disabled = false;
    inputStock.disabled = false;
    selectCategoria.disabled = false;
    selectMarca.disabled = false;

    btnEditarProducto.style.display = 'none';
    btnCerrarModalProducto.innerHTML = 'Cancelar';
    btnGuardarProducto.style.display = 'block';
  }
};

const handleCerrarModal = () => {
  console.log({ modoModal });
  if (modoModal === MODOS_MODAL.nuevo || modoModal === MODOS_MODAL.ver) {
    modalProductos.hide();
  } else {
    //Esta en modo edicion
    cambiarEstadoModal(MODOS_MODAL.ver);
  }
};

btnNuevoProducto.addEventListener('click', mostrarModalProductos);
btnGuardarProducto.addEventListener('click', guardarProducto);
btnBuscarProducto.addEventListener('click', buscarProducto);

btnEditarProducto.addEventListener('click', editarProducto);

btnCerrarModalProducto.addEventListener('click', handleCerrarModal);

obtenerProductos();
