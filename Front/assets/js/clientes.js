const MODOS_MODAL = {
  nuevo: "nuevo",
  ver: "ver",
  edicion: "edicion",
};

let modoModal = MODOS_MODAL.nuevo;

const modalClientes = new bootstrap.Modal("#modal-clientes");

const btnEditarCliente = document.getElementById("btn-editar-cliente");

const buscbtnNuevoCliente = document.getElementById("btn-nuevo-cliente");
const btnGuardarCliente = document.getElementById("btn-guardar-cliente");
const btnBuscarCliente = document.getElementById("btn-buscar-cliente");
const btnCerrarModalCliente = document.getElementById(
  "btn-cerrar-modal-cliente"
);

const inputNombre = document.getElementById("nombre");

const tituloModalClientes = document.getElementById("titulo-modal-clientes");

const obtenerClientes = () => {
  const clientes = [
    {
      id: 15,
      nombre: "Steve Jobs",
      avatar: "IMG",
      dni: "58.256.3236",
      telefono: "11 6726-3106",
    },
    {
      id: 158,
      nombre: "Bill Gates",
      avatar: "IMG",
      dni: "28.256.3236",
      telefono: "11 1122-6598",
    },
    {
      id: 358,
      nombre: "Richard Stallman",
      avatar: "IMG",
      dni: "35.153.884",
      telefono: "11 2212-2356",
    },
    ,
    {
      id: 918,
      nombre: "Elon Musk",
      avatar: "IMG",
      dni: "45.252.112",
      telefono: "11 3344-5566",
    },
  ];

  mostrarClientesEnTabla(clientes);
};

const mostrarClientesEnTabla = (clientes) => {
  const datosTabla = document.getElementById("datos-tabla");

  let html = "";

  //Dibujar la tabla de clientes
  clientes.forEach((cliente) => {
    html += `<tr>
              <td>${cliente.nombre}</td>
              <td>${cliente.dni}</td>
              <td>${cliente.telefono}</td>
              <td>${cliente.avatar}</td>

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

  const botonesVer = document.getElementsByClassName("btn-ver");
  const botonesEliminar = document.getElementsByClassName("btn-eliminar");

  for (const botonVer of botonesVer) {
    botonVer.addEventListener("click", mostrarModalDetalleCliente);
  }

  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener("click", eliminarCliente);
  }

  feather.replace();
};

const mostrarModalDetalleCliente = (event) => {
  const idCliente = event.target.getAttribute("data-id-cliente");

  console.log("Mostrar el detalle del cliente", idCliente);

  cambiarEstadoModal(MODOS_MODAL.ver);
  modalClientes.show();
};

const eliminarCliente = (event) => {
  const idCliente = event.target.getAttribute("data-id-cliente");

  Swal.fire({
    text: "¿Realmente desde eliminar el cliente?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#77669d",
    cancelButtonColor: "#b9b8c9",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      alert("Eliminar cliente " + idCliente);
    }
  });
};

const mostrarModalClientes = () => {
  cambiarEstadoModal(MODOS_MODAL.nuevo);
  modalClientes.show();
};

const guardarCliente = () => {
  const nombre = document.getElementById("nombre").value;

  console.log(nombre);

  modalClientes.hide();
};

const buscarCliente = () => {
  const cajaBusqueda = document.getElementById("caja-busqueda");

  const textoBuscado = cajaBusqueda.value;

  console.log("Buscar el cliente...", textoBuscado);
};

const editarCliente = () => {
  cambiarEstadoModal(MODOS_MODAL.edicion);
};

const cambiarEstadoModal = (nuevoModoModal) => {
  modoModal = nuevoModoModal;
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    tituloModalClientes.innerHTML = "Nuevo Cliente";

    inputNombre.value = "";

    inputNombre.disabled = false;

    btnEditarCliente.style.display = "none";
    btnGuardarCliente.style.display = "block";
    btnCerrarModalCliente.innerHTML = "Cancelar";
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalClientes.innerHTML = "Ver Cliente";

    inputNombre.value = "XXXX x x x ";

    inputNombre.disabled = true;

    btnEditarCliente.style.display = "block";
    btnGuardarCliente.style.display = "none";
    btnCerrarModalCliente.innerHTML = "Cerrar";
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalClientes.innerHTML = "Editar Cliente";

    inputNombre.disabled = false;

    btnEditarCliente.style.display = "none";
    btnCerrarModalCliente.innerHTML = "Cancelar";
    btnGuardarCliente.style.display = "block";
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

buscbtnNuevoCliente.addEventListener("click", mostrarModalClientes);
btnGuardarCliente.addEventListener("click", guardarCliente);
btnBuscarCliente.addEventListener("click", buscarCliente);

btnEditarCliente.addEventListener("click", editarCliente);

btnCerrarModalCliente.addEventListener("click", handleCerrarModal);

obtenerClientes();
