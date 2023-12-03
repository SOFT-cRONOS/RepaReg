const showSidebar = () => {
  const sidebar = document.getElementById("sidebarMenu");

  sidebar.innerHTML = `<div class="position-sticky pt-3">
                                <ul class="nav flex-column">
                                    <li class="nav-item">
                                        <a
                                            class="nav-link active"
                                            aria-current="page"
                                            href="index.html"
                                        >
                                            <span data-feather="home"></span>
                                            Inicio
                                        </a>
                                    </li>
    
                                    <li class="nav-item">
                                        <a class="nav-link" href="productos.html">
                                            <span data-feather="archive"></span>
                                            Productos
                                        </a>
                                    </li>
    
                                    <li class="nav-item">
                                    <a class="nav-link" href="servicios.html">
                                        <span data-feather="truck"></span>
                                        Servicios
                                    </a>
                                    </li>
    
                                    <li class="nav-item">
                                    <a class="nav-link" href="clientes.html">
                                        <span data-feather="users"></span>
                                        Clientes
                                    </a>
                                    </li>
    
                                    <li class="nav-item">
                                      <a class="nav-link" href="ventas.html">
                                          <span data-feather="dollar-sign"></span>
                                          Ventas
                                      </a>
                                    </li>
  
    
                                    <li class="nav-item">
                                      <a class="nav-link" href="reporte_stock.html">
                                          <span data-feather="bar-chart-2"></span>
                                          Reporte de Stock
                                      </a>
                                    </li>
                                      
                                    <li class="nav-item">
                                      <a class="nav-link" href="reporte_total_ventas_x_clientes.html">
                                          <span data-feather="bar-chart-2"></span>
                                          Ranking de total ventas x cliente
                                      </a>
                                    </li>

                                    <li class="nav-item">
                                      <a class="nav-link" href="reporte_total_ventas_x_servicio.html">
                                          <span data-feather="bar-chart-2"></span>
                                          Ranking de ventas por servicio
                                      </a>
                                    </li>

                                    <li class="nav-item">
                                      <a class="nav-link" href="reporte_total_ventas_x_producto.html">
                                          <span data-feather="bar-chart-2"></span>
                                          Ranking de ventas por producto
                                      </a>
                                    </li>
                                    <hr class="navbar-divider">
                                    <li><a id="logout-link" class="nav-link" href="#" onclick="logout()"><span data-feather="log-out"></span>Salir</a></li>




                                </ul>
                            </div>`;
};

const getUserData = async () => {
  const authToken = getAuthToken();

  const url = `http://localhost:5200/usuarios?authToken=${authToken}`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const loadDataUser = async () => {
  /* carga de datos cliente */
  const user = await getUserData();
  const image = document.getElementById("user-image");
  image.src = user.imagen;
  const userNameElement = document.getElementById("user-name");
  userNameElement.innerText = user.nombre;
};

showSidebar();
loadDataUser();
feather.replace();

const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "login.html";
};

document.getElementById("logout-link").addEventListener("click", logout);
