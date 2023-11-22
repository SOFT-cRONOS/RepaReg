const MODOS_MODAL = {
  nuevo: "nuevo",
  ver: "ver",
  edicion: "edicion",
};
let idCliente = 0;
let modoModal = MODOS_MODAL.nuevo;

//elementos del modal
const modalClientes = new bootstrap.Modal("#modal-clientes");
const btnEditarCliente = document.getElementById("btn-editar-cliente");
const buscbtnNuevoCliente = document.getElementById("btn-nuevo-cliente");
const btnGuardarCliente = document.getElementById("btn-guardar-cliente");
const btnBuscarCliente = document.getElementById("btn-buscar-cliente");
const btnCerrarModalCliente = document.getElementById("btn-cerrar-modal-cliente");
const tituloModalClientes = document.getElementById("titulo-modal-clientes");
//input del modal
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputDni = document.getElementById("dni"); 
const inputtelefono = document.getElementById("telefono");
const inputfoto = document.getElementById("foto"); 

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
  return fetch(`http://localhost:5200/user/${id}/client`, requestOptions)
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

const mostrarClientesEnTabla = () => {
  const clientes = obtenerClientes();
  const datosTabla = document.getElementById("datos-tabla");

  let html = "";

  //Dibujar la tabla de clientes
  clientes.forEach((cliente) => {
    html += `<tr>
              <td>${cliente.nombre}</td>
              <td>${cliente.apellido}</td>
              <td>${cliente.cuitCuil}</td>
              <td>${cliente.direccion}</td>
              <td>${cliente.email}</td>
              <td>${cliente.telefono}</td>
              <td><img src="${cliente.foto}" width="50px"></td>
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
  idCliente = event.target.getAttribute("data-id-cliente");

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
    //esto lo deberia configurar la clase
    //confirmButtonColor: "#77669d",
    confirmButtonClass: "btn-primary",
    //cancelButtonColor: "#b9b8c9",
    cancelButtonClass: "btn-cancel",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      alert("Eliminar cliente " + idCliente);
      //solicitud fetch
      // config de token
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token')

      const requestOptions = {
      method : 'PUT',
      headers:{
          'Content-Type': 'application/json',
          'x-access-token': token,
          'user-id': id
          }
      }
      // fin config de token
      
      
      //link a items retorna la respuesta del back
      return fetch(`http://localhost:5200/user/${id}/client/${idCliente}`, requestOptions)
      .then(
        resp => {return resp.json()
        })
      .catch(error => {
        console.error('Error al actualizar cliente:', error);
        throw error; // devuelve error
      });}
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
    input_state("clear");
    input_state("enabled");
    btnEditarCliente.style.display = "none";
    btnGuardarCliente.style.display = "block";
    btnCerrarModalCliente.innerHTML = "Cancelar";
  } else if (nuevoModoModal === MODOS_MODAL.ver) {

    const cliente = obtenerClientesporid(idCliente);


    tituloModalClientes.innerHTML = "Ver Cliente";
    input_state("disabled");
    inputNombre.value = cliente.nombre;
    inputApellido.value = cliente.apellido;
    inputDni.value = cliente.dni;
    inputtelefono.value = cliente.telefono;
    inputfoto.value = cliente.foto;

    btnEditarCliente.style.display = "block";
    btnGuardarCliente.style.display = "none";
    btnCerrarModalCliente.innerHTML = "Cerrar";
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalClientes.innerHTML = "Editar Cliente";

    input_state("enabled");

    btnEditarCliente.style.display = "none";
    btnCerrarModalCliente.innerHTML = "Cancelar";
    btnGuardarCliente.style.display = "block";
  }
};

//controla los estados de los input
//enabled, disabled, clear
const input_state = (estado) => {
  if (estado == "disabled") {
    inputNombre.disabled = true;
    inputApellido.disabled = true;
    inputDni.disabled = true;
    inputtelefono.disabled = true;
    inputfoto.disabled = true;
  }
  if (estado == "enabled") {
    inputNombre.disabled = false;
    inputApellido.disabled = false;
    inputDni.disabled = false;
    inputtelefono.disabled = false;
    inputfoto.disabled = false;
  }
  if (estado == "clear") {
    inputNombre.value = "";
    inputApellido.value = "";
    inputDni.value = "";
    inputtelefono.value = "";
    inputfoto.value = "";
  }
}

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

mostrarClientesEnTabla();
