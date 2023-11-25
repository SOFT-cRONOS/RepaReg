let idClienteSeleccionado = null;

const URL_BASE = 'http://localhost:5200';

const MODOS_MODAL = {
  nuevo: 'nuevo',
  ver: 'ver',
  edicion: 'edicion',
};
let idCliente = 0;
let modoModal = MODOS_MODAL.nuevo;

//elementos del modal
const modalClientes = new bootstrap.Modal('#modal-clientes');
const btnEditarCliente = document.getElementById('btn-editar-cliente');
const buscbtnNuevoCliente = document.getElementById('btn-nuevo-cliente');
const btnGuardarCliente = document.getElementById('btn-guardar-cliente');
const btnBuscarCliente = document.getElementById('btn-buscar-cliente');
const btnCerrarModalCliente = document.getElementById(
  'btn-cerrar-modal-cliente'
);
const tituloModalClientes = document.getElementById('titulo-modal-clientes');
//input del modal
const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputCuitCuil = document.getElementById('cuit-cuil');
const inputTelefono = document.getElementById('telefono');
const inputDireccion = document.getElementById('direccion');
const inputEmail = document.getElementById('email');

const obtenerClientes = async () => {
  const url = `${URL_BASE}/clientes`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const mostrarClientesEnTabla = async () => {
  const clientes = await obtenerClientes();
  const datosTabla = document.getElementById('datos-tabla');

  let html = '';

  //Dibujar la tabla de clientes
  clientes.forEach((cliente) => {
    html += `<tr>
              <td>${cliente.nombre}</td>
              <td>${cliente.apellido}</td>
              <td>${cliente.cuit_cuil}</td>
              <td>${cliente.direccion}</td>
              <td>${cliente.email}</td>
              <td>${cliente.telefono}</td>
              <td>
                <button data-id-cliente="${cliente.id}" class="btn btn-ver" >
                  <span data-feather="eye"></span>Ver
                </button>

                <button data-id-cliente="${cliente.id}" class="btn btn-eliminar">
                  <span data-feather="trash"></span>Eliminar
                </button>
              </td>
            </tr>`;
  });

  datosTabla.innerHTML = html;

  const botonesVer = document.getElementsByClassName('btn-ver');
  const botonesEliminar = document.getElementsByClassName('btn-eliminar');

  for (const botonVer of botonesVer) {
    botonVer.addEventListener('click', mostrarModalDetalleCliente);
  }

  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener('click', eliminarCliente);
  }

  feather.replace();
};

const mostrarModalDetalleCliente = async (event) => {
  idCliente = event.target.getAttribute('data-id-cliente');

  console.log(event.target);

  idClienteSeleccionado = idCliente;

  const url = `${URL_BASE}/clientes/${idCliente}`;

  const response = await fetch(url);
  const { nombre, apellido, cuit_cuil, direccion, email, telefono } =
    await response.json();

  inputNombre.value = nombre;
  inputApellido.value = apellido;
  inputCuitCuil.value = cuit_cuil;
  inputDireccion.value = direccion;
  inputEmail.value = email;
  inputTelefono.value = telefono;

  cambiarEstadoModal(MODOS_MODAL.ver);
  modalClientes.show();
};

const eliminarCliente = (event) => {
  const idCliente = event.target.getAttribute('data-id-cliente');

  Swal.fire({
    text: '¿Realmente desde eliminar el cliente?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonClass: 'btn-primary',
    cancelButtonClass: 'btn-cancel',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
  }).then(async (result) => {
    if (result.isConfirmed) {
      const url = `${URL_BASE}/clientes/${idCliente}`;

      const response = await fetch(url, {
        method: 'DELETE',

        headers: { 'Content-Type': 'application/json' },
      });

      await response.json();

      mostrarClientesEnTabla();
    }
  });
};

const mostrarModalClientes = () => {
  cambiarEstadoModal(MODOS_MODAL.nuevo);
  modalClientes.show();
};

const guardarCliente = async () => {
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const cuit_cuil = document.getElementById('cuit-cuil').value;
  const direccion = document.getElementById('direccion').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;

  let url = `${URL_BASE}/clientes`;
  let method = 'POST';

  if (modoModal === MODOS_MODAL.edicion) {
    url += `/${idClienteSeleccionado}`;
    method = 'PUT';
  }

  const data = { nombre, apellido, direccion, cuit_cuil, email, telefono };

  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  await response.json();

  mostrarClientesEnTabla();

  modalClientes.hide();
};

const buscarCliente = () => {
  const cajaBusqueda = document.getElementById('caja-busqueda');

  const textoBuscado = cajaBusqueda.value;

  console.log('Buscar el cliente...', textoBuscado);
};

const editarCliente = () => {
  cambiarEstadoModal(MODOS_MODAL.edicion);
};

const cambiarEstadoModal = (nuevoModoModal) => {
  modoModal = nuevoModoModal;
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    idCliente = null;

    tituloModalClientes.innerHTML = 'Nuevo Cliente';

    inputNombre.value = '';
    inputApellido.value = '';
    inputCuitCuil.value = '';
    inputDireccion.value = '';
    inputEmail.value = '';
    inputTelefono.value = '';

    inputNombre.disabled = false;
    inputApellido.disabled = false;
    inputCuitCuil.disabled = false;
    inputDireccion.disabled = false;
    inputEmail.disabled = false;
    inputTelefono.disabled = false;

    btnEditarCliente.style.display = 'none';
    btnGuardarCliente.style.display = 'block';
    btnCerrarModalCliente.innerHTML = 'Cancelar';
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalClientes.innerHTML = 'Ver Cliente';

    inputNombre.disabled = true;
    inputApellido.disabled = true;
    inputCuitCuil.disabled = true;
    inputDireccion.disabled = true;
    inputEmail.disabled = true;
    inputTelefono.disabled = true;

    btnEditarCliente.style.display = 'block';
    btnGuardarCliente.style.display = 'none';
    btnCerrarModalCliente.innerHTML = 'Cerrar';
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalClientes.innerHTML = 'Editar Cliente';

    inputNombre.disabled = false;
    inputApellido.disabled = false;
    inputCuitCuil.disabled = false;
    inputDireccion.disabled = false;
    inputEmail.disabled = false;
    inputTelefono.disabled = false;

    btnEditarCliente.style.display = 'none';
    btnCerrarModalCliente.innerHTML = 'Cancelar';
    btnGuardarCliente.style.display = 'block';
  }
};

const handleCerrarModal = () => {
  console.log({ modoModal });
  if (modoModal === MODOS_MODAL.nuevo || modoModal === MODOS_MODAL.ver) {
    modalClientes.hide();
  } else {
    //Esta en modo edicion
    cambiarEstadoModal(MODOS_MODAL.ver);
  }
};

buscbtnNuevoCliente.addEventListener('click', mostrarModalClientes);
btnGuardarCliente.addEventListener('click', guardarCliente);
btnBuscarCliente.addEventListener('click', buscarCliente);

btnEditarCliente.addEventListener('click', editarCliente);

btnCerrarModalCliente.addEventListener('click', handleCerrarModal);

mostrarClientesEnTabla();
