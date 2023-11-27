const URL_BASE = "http://localhost:5200";

const MODOS_MODAL = {
  nuevo: "nuevo",
  ver: "ver",
  edicion: "edicion",
};

let idServicioSeleccionado = null;

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

const obtenerServicios = async () => {
  const authToken = getAuthToken();

  const url = `${URL_BASE}/servicios?authToken=${authToken}`;

  const response = await fetch(url);
  const data = await response.json();

  mostrarServiciosEnTabla(data);
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

const mostrarModalDetalleServicio = async (event) => {
  const idServicio = event.target.getAttribute("data-id-servicio");

  idServicioSeleccionado = idServicio;

  const authToken = getAuthToken();

  const url = `${URL_BASE}/servicios/${idServicio}?authToken=${authToken}`;

  const response = await fetch(url);
  const { nombre, precio, descripcion } = await response.json();

  inputNombre.value = nombre;
  inputPrecio.value = precio;
  inputDescripcion.value = descripcion;

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
  }).then(async (result) => {
    if (result.isConfirmed) {
      const authToken = getAuthToken();

      const url = `${URL_BASE}/servicios/${idServicio}?authToken=${authToken}`;

      const response = await fetch(url, {
        method: "DELETE",

        headers: { "Content-Type": "application/json" },
      });

      await response.json();

      obtenerServicios();
    }
  });
};

const mostrarModalServicios = () => {
  cambiarEstadoModal(MODOS_MODAL.nuevo);
  modalServicios.show();
};

const guardarServicio = async () => {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;

  const authToken = getAuthToken();

  let url = `${URL_BASE}/servicios`;
  let method = "POST";

  if (modoModal === MODOS_MODAL.edicion) {
    url += `/${idServicioSeleccionado}`;
    method = "PUT";
  }

  url += `?authToken=${authToken}`;

  const data = { nombre, precio, descripcion };

  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  await response.json();

  await obtenerServicios();

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
    idServicioSeleccionado = null;

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
