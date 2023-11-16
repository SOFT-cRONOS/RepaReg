const modalProductos = new bootstrap.Modal("#modal-productos");

const btnNuevoProducto = document.getElementById("btn-nuevo-producto");
const btnGuardarProducto = document.getElementById("btn-guardar-producto");

const mostrarModalProductos = () => {
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("stock").value = "";

  modalProductos.show();
};

const guardarProducto = () => {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;

  console.log(nombre, precio, stock);

  modalProductos.hide();
};

btnNuevoProducto.addEventListener("click", mostrarModalProductos);
btnGuardarProducto.addEventListener("click", guardarProducto);
