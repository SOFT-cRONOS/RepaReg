const MODOS_MODAL = {
  nuevo: 'nuevo',
  ver: 'ver',
  edicion: 'edicion',
};

let modoModal = MODOS_MODAL.nuevo;

const modalCategorias = new bootstrap.Modal('#modal-categorias');

const btnEditarCategoria = document.getElementById('btn-editar-categoria');

const botonNuevaCategoria = document.getElementById('btn-nueva-categoria');
const btnGuardarCategoria = document.getElementById('btn-guardar-categoria');

const btnCerrarModalCategoria = document.getElementById(
  'btn-cerrar-modal-categoria'
);

const inputNombre = document.getElementById('nombre');

const tituloModalCategorias = document.getElementById(
  'titulo-modal-categorias'
);

const obtenerCategorias = () => {
  const categorias = [
    {
      id: 15,
      nombre: 'Electrodomesticos',
      detalle: 'Detalle de la categoria electrodomesticos',
    },
    {
      id: 159,
      nombre: 'Vehiculos',
      detalle: 'Detalle de la categoria Vehiculos',
    },
    {
      id: 2159,
      nombre: 'Inmuebles',
      detalle: 'Detalle de la categoria Inmuebles',
    },
    {
      id: 998,
      nombre: 'Electronica',
      detalle: 'Detalle de la categoria Electronica',
    },
  ];

  mostrarCategoriasEnTabla(categorias);
};

const mostrarCategoriasEnTabla = (categorias) => {
  const datosTabla = document.getElementById('datos-tabla');

  let html = '';

  //Dibujar la tabla de categorias
  categorias.forEach((categoria) => {
    html += `<tr>
              <td>${categoria.nombre}</td>
              <td>${categoria.detalle}</td>
     
              <td>
                <button data-id-categoria="${categoria.id}" class="btn btn-ver" >
                  <span data-feather="eye"></span>Ver
                </button>

                <button data-id-categoria="${categoria.id}" class="btn btn-eliminar">
                  <span data-feather="trash"></span>Eliminar
                </button>
              </td>
            </tr>`;
  });

  datosTabla.innerHTML = html;

  const botonesVer = document.getElementsByClassName('btn-ver');
  const botonesEliminar = document.getElementsByClassName('btn-eliminar');

  for (const botonVer of botonesVer) {
    botonVer.addEventListener('click', mostrarModalDetalleCategoria);
  }

  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener('click', eliminarCategoria);
  }

  feather.replace();
};

const mostrarModalDetalleCategoria = (event) => {
  const idCategoria = event.target.getAttribute('data-id-categoria');

  console.log('Mostrar el detalle del categoria', idCategoria);

  cambiarEstadoModal(MODOS_MODAL.ver);
  modalCategorias.show();
};

const eliminarCategoria = (event) => {
  const idCategoria = event.target.getAttribute('data-id-categoria');

  Swal.fire({
    text: '¿Realmente desde eliminar el categoría?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#77669d',
    cancelButtonColor: '#b9b8c9',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      alert('Eliminar categoría ' + idCategoria);
    }
  });
};

const mostrarmodalCategorias = () => {
  cambiarEstadoModal(MODOS_MODAL.nuevo);
  modalCategorias.show();
};

const guardarCategoria = () => {
  const nombre = document.getElementById('nombre').value;

  console.log(nombre);

  modalCategorias.hide();
};

const cambiarEstadoModal = (nuevoModoModal) => {
  modoModal = nuevoModoModal;
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    tituloModalCategorias.innerHTML = 'Nueva Categoría';

    inputNombre.value = '';

    inputNombre.disabled = false;

    btnEditarCategoria.style.display = 'none';
    btnGuardarCategoria.style.display = 'block';
    btnCerrarModalCategoria.innerHTML = 'Cancelar';
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalCategorias.innerHTML = 'Ver Categoría';

    inputNombre.value = 'XXXX x x x ';

    inputNombre.disabled = true;

    btnEditarCategoria.style.display = 'block';
    btnGuardarCategoria.style.display = 'none';
    btnCerrarModalCategoria.innerHTML = 'Cerrar';
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalCategorias.innerHTML = 'Editar Categoría';

    inputNombre.disabled = false;

    btnEditarCategoria.style.display = 'none';
    btnCerrarModalCategoria.innerHTML = 'Cancelar';
    btnGuardarCategoria.style.display = 'block';
  }
};

const handleCerrarModal = () => {
  console.log({ modoModal });
  if (modoModal === MODOS_MODAL.nuevo || modoModal === MODOS_MODAL.ver) {
    modalCategorias.hide();
  } else {
    //Esta en modo edicion
    cambiarEstadoModal(MODOS_MODAL.ver);
  }
};

botonNuevaCategoria.addEventListener('click', mostrarmodalCategorias);
btnGuardarCategoria.addEventListener('click', guardarCategoria);

btnCerrarModalCategoria.addEventListener('click', handleCerrarModal);

obtenerCategorias();
