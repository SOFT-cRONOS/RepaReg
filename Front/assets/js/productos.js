const MODOS_MODAL = {
  nuevo: "nuevo",
  ver: "ver",
  edicion: "edicion",
};

const modoModal = MODOS_MODAL.nuevo;

const modalProductos = new bootstrap.Modal("#modal-productos");

const btnEditarProducto = document.getElementById("btn-editar-producto");

const btnNuevoProducto = document.getElementById("btn-nuevo-producto");
const btnGuardarProducto = document.getElementById("btn-guardar-producto");
const btnBuscarProducto = document.getElementById("btn-buscar-producto");

const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputStock = document.getElementById("stock");

const tituloModalProductos = document.getElementById("titulo-modal-productos");

const obtenerProductos = () => {
  const productos = [
    {
      id: 15,
      nombre: "Monitor Samsung",
      precio: 2530000,
      stock: 5,
      fechaIngreso: "20/11/2023",
    },
    {
      id: 235,
      nombre: "Notebook Lenovo",
      precio: 8565000,
      stock: 2,
      fechaIngreso: "15/10/2023",
    },
    {
      id: 38,
      nombre: "Webcam LG",
      precio: 57300,
      stock: 1,
      fechaIngreso: "10/11/2023",
    },
    {
      id: 49,
      nombre: "Mouse Logitech",
      precio: 59630,
      stock: 3,
      fechaIngreso: "13/11/2023",
    },
    {
      id: 545,
      nombre: "Teclado Microsoft",
      precio: 123124,
      stock: 20,
      fechaIngreso: "08/11/2023",
    },
    {
      id: 621,
      nombre: "Mouse Genius",
      precio: 15600,
      stock: 15,
      fechaIngreso: "12/08/2023",
    },
    {
      id: 70,
      nombre: "Notebook HP",
      precio: 1560000,
      stock: 19,
      fechaIngreso: "05/08/2023",
    },
  ];

  mostrarProductosEnTabla(productos);
};

const mostrarProductosEnTabla = (productos) => {
  const datosTabla = document.getElementById("datos-tabla");

  let html = "";

  //Dibujar la tabla de productos
  productos.forEach((producto) => {
    html += `<tr>
              <td>${producto.nombre}</td>
              <td>$ ${producto.precio}</td>
              <td>${producto.stock}</td>
              <td>${producto.fechaIngreso}</td>

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

  const botonesVer = document.getElementsByClassName("btn-ver");
  const botonesEliminar = document.getElementsByClassName("btn-eliminar");

  for (const botonVer of botonesVer) {
    botonVer.addEventListener("click", mostrarModalDetalleProducto);
  }

  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener("click", eliminarProducto);
  }
};

const mostrarModalDetalleProducto = (event) => {
  const idProducto = event.target.getAttribute("data-id-producto");

  console.log("Mostrar el detalle del producto", idProducto);

  cambiarEstadoModal(MODOS_MODAL.ver);
  modalProductos.show();
};

const eliminarProducto = (event) => {
  const idProducto = event.target.getAttribute("data-id-producto");

  alert("Eliminar producto " + idProducto);
};

const mostrarModalProductos = () => {
  cambiarEstadoModal(MODOS_MODAL.nuevo);
  modalProductos.show();
};

const guardarProducto = () => {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;

  console.log(nombre, precio, stock);

  modalProductos.hide();
};

const buscarProducto = () => {
  const cajaBusqueda = document.getElementById("caja-busqueda");

  const textoBuscado = cajaBusqueda.value;

  console.log("Buscar el producto...", textoBuscado);
};

const editarProducto = () => {
  cambiarEstadoModal(MODOS_MODAL.edicion);
};

const cambiarEstadoModal = (nuevoModoModal) => {
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    tituloModalProductos.innerHTML = "Nuevo Producto";

    inputNombre.value = "";
    inputPrecio.value = "";
    inputStock.value = "";

    inputNombre.disabled = false;
    inputPrecio.disabled = false;
    inputStock.disabled = false;

    btnEditarProducto.style.display = "none";
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalProductos.innerHTML = "Ver producto";

    inputNombre.value = "XXXX x x x ";
    inputPrecio.value = "55555";
    inputStock.value = "99999";

    inputNombre.disabled = true;
    inputPrecio.disabled = true;
    inputStock.disabled = true;

    btnEditarProducto.style.display = "block";
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalProductos.innerHTML = "Editar producto";

    inputNombre.disabled = false;
    inputPrecio.disabled = false;
    inputStock.disabled = false;

    btnEditarProducto.style.display = "none";
  }
};

btnNuevoProducto.addEventListener("click", mostrarModalProductos);
btnGuardarProducto.addEventListener("click", guardarProducto);
btnBuscarProducto.addEventListener("click", buscarProducto);

console.log({ btnEditarProducto });

btnEditarProducto.addEventListener("click", editarProducto);

obtenerProductos();
