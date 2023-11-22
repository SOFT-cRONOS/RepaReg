const MODOS_MODAL = {
  nuevo: "nuevo",
  ver: "ver",
  edicion: "edicion",
};

let modoModal = MODOS_MODAL.nuevo;

const modalProductos = new bootstrap.Modal("#modal-productos");

const btnEditarProducto = document.getElementById("btn-editar-producto");

const btnNuevoProducto = document.getElementById("btn-nuevo-producto");
const btnGuardarProducto = document.getElementById("btn-guardar-producto");
const btnBuscarProducto = document.getElementById("btn-buscar-producto");
const btnCerrarModalProducto = document.getElementById(
  "btn-cerrar-modal-producto"
);

const inputNombre = document.getElementById("nombre");
const inputPrecioCompra = document.getElementById("precio-compra");
const inputPrecioVenta = document.getElementById("precio-venta");
const inputStock = document.getElementById("stock");
const selectCategoria = document.getElementById("categoria");
const selectMarca = document.getElementById("marca");

const tituloModalProductos = document.getElementById("titulo-modal-productos");

const obtenerProductos = () => {
  const productos = [
    {
      id: 15,
      nombre: "Monitor Samsung",
      precioCompra: 2530000,
      precioVenta: 2930000,
      stock: 5,
      marca: "Samsung",
      categoria: "Computación",
    },
    {
      id: 235,
      nombre: "Notebook Lenovo",
      precioCompra: 8565000,
      precioVenta: 9565000,
      stock: 2,
      marca: "Lenovo",
      categoria: "Computación",
    },
    {
      id: 38,
      nombre: "Webcam LG",
      precioCompra: 5565000,
      precioVenta: 6565000,
      stock: 20,
      marca: "LG",
      categoria: "Computación",
    },
    {
      id: 49,
      nombre: "Mouse Logitech",
      precioCompra: 4565000,
      precioVenta: 8565000,
      stock: 29,
      marca: "Logitech",
      categoria: "Computación",
    },
    {
      id: 545,
      nombre: "Teclado Microsoft",
      precioCompra: 965000,
      precioVenta: 1065000,
      stock: 35,
      marca: "Microsoft",
      categoria: "Computación",
    },
    {
      id: 621,
      nombre: "Mouse Genius",
      precioCompra: 865000,
      precioVenta: 965000,
      stock: 152,
      marca: "Genius",
      categoria: "Computación",
    },
    {
      id: 70,
      nombre: "Audi A4",
      precioCompra: 8650000000,
      precioVenta: 9650000000,
      stock: 4,
      marca: "Audi",
      categoria: "Vehiculos",
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
              <td>${producto.categoria}</td>
              <td>${producto.marca}</td>
              <td>$ ${producto.precioCompra}</td>
              <td>$ ${producto.precioVenta}</td>
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

  const botonesVer = document.getElementsByClassName("btn-ver");
  const botonesEliminar = document.getElementsByClassName("btn-eliminar");

  for (const botonVer of botonesVer) {
    botonVer.addEventListener("click", mostrarModalDetalleProducto);
  }

  for (const botonEliminar of botonesEliminar) {
    botonEliminar.addEventListener("click", eliminarProducto);
  }

  feather.replace();
};

const mostrarModalDetalleProducto = (event) => {
  const idProducto = event.target.getAttribute("data-id-producto");

  console.log("Mostrar el detalle del producto", idProducto);

  cambiarEstadoModal(MODOS_MODAL.ver);
  modalProductos.show();
};

const eliminarProducto = (event) => {
  const idProducto = event.target.getAttribute("data-id-producto");

  Swal.fire({
    text: "¿Realmente desde eliminar el producto?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#77669d",
    cancelButtonColor: "#b9b8c9",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      alert("Eliminar producto " + idProducto);
    }
  });
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
  modoModal = nuevoModoModal;
  if (nuevoModoModal === MODOS_MODAL.nuevo) {
    tituloModalProductos.innerHTML = "Nuevo Producto";

    inputNombre.value = "";
    inputPrecioCompra.value = "";
    inputPrecioVenta.value = "";
    inputStock.value = "";
    selectCategoria.value = "-1";
    selectMarca.value = "-1";

    inputNombre.disabled = false;
    inputPrecioCompra.disabled = false;
    inputPrecioVenta.disabled = false;
    inputStock.disabled = false;
    selectCategoria.disabled = false;
    selectMarca.disabled = false;

    btnEditarProducto.style.display = "none";
    btnGuardarProducto.style.display = "block";
    btnCerrarModalProducto.innerHTML = "Cancelar";
  } else if (nuevoModoModal === MODOS_MODAL.ver) {
    tituloModalProductos.innerHTML = "Ver Producto";

    inputNombre.value = "XXXX x x x ";
    inputPrecioCompra.value = "55555";
    inputPrecioVenta.value = "6666";
    inputStock.value = "99999";
    selectCategoria.value = 2;
    selectMarca.value = 18;

    inputNombre.disabled = true;
    inputPrecioCompra.disabled = true;
    inputPrecioVenta.disabled = true;
    inputStock.disabled = true;
    selectCategoria.disabled = true;
    selectMarca.disabled = true;

    btnEditarProducto.style.display = "block";
    btnGuardarProducto.style.display = "none";
    btnCerrarModalProducto.innerHTML = "Cerrar";
  } else if (nuevoModoModal === MODOS_MODAL.edicion) {
    tituloModalProductos.innerHTML = "Editar Producto";

    inputNombre.disabled = false;
    inputPrecioCompra.disabled = false;
    inputPrecioVenta.disabled = false;
    inputStock.disabled = false;
    selectCategoria.disabled = false;
    selectMarca.disabled = false;

    btnEditarProducto.style.display = "none";
    btnCerrarModalProducto.innerHTML = "Cancelar";
    btnGuardarProducto.style.display = "block";
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

btnNuevoProducto.addEventListener("click", mostrarModalProductos);
btnGuardarProducto.addEventListener("click", guardarProducto);
btnBuscarProducto.addEventListener("click", buscarProducto);

btnEditarProducto.addEventListener("click", editarProducto);

btnCerrarModalProducto.addEventListener("click", handleCerrarModal);

obtenerProductos();
