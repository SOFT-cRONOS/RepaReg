const MODOS_MODAL = {
  nuevo: "nuevo",
  ver: "ver",
  edicion: "edicion",
};

let modoModal = MODOS_MODAL.nuevo;

const modalServicios = new bootstrap.Modal("#modal-servicios");

const btnEditarServicio = document.getElementById("btn-editar-servicio");

const btnNuevoServicio = document.getElementById("btn-nuevo-servicio");
const btnGuardarServicio = document.getElementById("btn-guardar-servicio");
const btnBuscarServicio = document.getElementById("btn-buscar-servicio");
const btnCerrarModalServicio = document.getElementById(
  "btn-cerrar-modal-servicio"
);

const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputDescripcion = document.getElementById("descripcion");

const tituloModalServicios = document.getElementById("titulo-modal-servicios");

const obtenerServicios = () => {
  const servicios = [
    {
      id: 15,
      nombre: "Servicio 1",
      precio: 25300,
      descripcion: "Descripcion del servicio 1",
    },
    {
      id: 2,
      nombre: "Servicio 2",
      precio: 35632,
      descripcion: "Descripcion del servicio 2",
    },
    {
      id: 43,
      nombre: "Servicio 3",
      precio: 157300,
      descripcion: "Descripcion del servicio 3",
    },
    {
      id: 149,
      nombre: "Servicio 4",
      precio: 69586,
      descripcion: "Descripcion del servicio 4",
    },
    {
      id: 1545,
      nombre: "Servicio 5",
      precio: 123122,
      descripcion: "Descripcion del servicio 5",
    },
    {
      id: 221,
      nombre: "Servicio 6",
      precio: 475600,
      descripcion: "Descripcion del servicio 6",
    },
    {
      id: 700,
      nombre: "Servicio 7",
      precio: 1560,
      descripcion: "Descripcion del servicio 7",
    },
  ];

  mostrarServiciosEnTabla(servicios);
};

const mostrarServiciosEnTabla = (servicios) => {
  const datosTabla = document.getElementById("datos-tabla");

  let html = "";

  //Dibujar la tabla de servicios
  servicios.forEach((servicio) => {
    html += `<tr>
              <td>${servicio.nombre}</td>
              <td>$ ${servicio.precio}</td>
              <td>${servicio.descripcion}</td>

              <td>
                <button data-id-servicio="${servicio.id}" class="btn btn-ver" >
                  <span data-feather="eye"></span>Ver
                </button>

                <button data-id-servicio="${servicio.id}" class="btn btn-eliminar">
                  <span data-feather="trash"></span>Eliminar
                </button>
              </td>
            </tr>`;
  });

  datosTabla.innerHTML = html;

  const botonesVer = document.getElementsByClassName("btn-ver");
  const botonesEliminar = document.getElementsByClassName("btn-eliminar");

  for (const botonVer of botonesVer) {
    botonVer.addEventListener("click", mostrarModalDetalleServicio);
  }

  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener("click", eliminarServicio);
  }

  feather.replace();
};

const mostrarModalDetalleServicio = (event) => {
  const idServicio = event.target.getAttribute("data-id-servicio");

  console.log("Mostrar el detalle del servicio", idServicio);

  cambiarEstadoModal(MODOS_MODAL.ver);
  modalServicios.show();
};

const eliminarServicio = (event) => {
  const idServicio = event.target.getAttribute("data-id-servicio");

  Swal.fire({
    text: "¿Realmente desde eliminar el servicio?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#77669d",
    cancelButtonColor: "#b9b8c9",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      alert("Eliminar servicio " + idServicio);
    }
  });
};

const mostrarModalServicios = () => {
  cambiarEstadoModal(MODOS_MODAL.nuevo);
  modalServicios.show();
};

const guardarServicio = () => {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;

  console.log(nombre, precio);

  modalServicios.hide();
};

const buscarServicio = () => {
  const cajaBusqueda = document.getElementById("caja-busqueda");

  const textoBuscado = cajaBusqueda.value;

  console.log("Buscar el servicio...", textoBuscado);
};

const editarServicio = () => {
  cambiarEstadoModal(MODOS_MODAL.edicion);
};

const cambiarEstadoModal = (nuevoModoModal) => {
  modoModal = nuevoModoModal;
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    tituloModalServicios.innerHTML = "Nuevo Servicio";

    inputNombre.value = "";
    inputPrecio.value = "";
    inputDescripcion.value = "";

    inputNombre.disabled = false;
    inputPrecio.disabled = false;
    inputDescripcion.disabled = false;

    btnEditarServicio.style.display = "none";
    btnGuardarServicio.style.display = "block";
    btnCerrarModalServicio.innerHTML = "Cancelar";
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalServicios.innerHTML = "Ver Servicio";

    inputNombre.value = "XXXX x x x ";
    inputPrecio.value = "55555";
    inputDescripcion.value = "Descripcion del servicio XXXXXXXXX";

    inputNombre.disabled = true;
    inputPrecio.disabled = true;
    inputDescripcion.disabled = true;

    btnEditarServicio.style.display = "block";
    btnGuardarServicio.style.display = "none";
    btnCerrarModalServicio.innerHTML = "Cerrar";
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalServicios.innerHTML = "Editar Servicio";

    inputNombre.disabled = false;
    inputPrecio.disabled = false;
    inputDescripcion.disabled = false;

    btnEditarServicio.style.display = "none";
    btnCerrarModalServicio.innerHTML = "Cancelar";
    btnGuardarServicio.style.display = "block";
  }
};

const handleCerrarModal = () => {
  console.log({ modoModal });
  if (modoModal === MODOS_MODAL.nuevo || modoModal === MODOS_MODAL.ver) {
    modalServicios.hide();
  } else {
    //Esta en modo edicion
    cambiarEstadoModal(MODOS_MODAL.ver);
  }
};

btnNuevoServicio.addEventListener("click", mostrarModalServicios);
btnGuardarServicio.addEventListener("click", guardarServicio);
btnBuscarServicio.addEventListener("click", buscarServicio);

btnEditarServicio.addEventListener("click", editarServicio);

btnCerrarModalServicio.addEventListener("click", handleCerrarModal);

obtenerServicios();
