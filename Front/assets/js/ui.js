const showSidebar = () => {
  const sidebar = document.getElementById('sidebarMenu');

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
                                    <a class="nav-link" href="reporte_total_compras_x_clientes.html">
                                        <span data-feather="bar-chart-2"></span>
                                        Reporte de total compras x cliente
                                    </a>
                                  </li>
                              </ul>
                          </div>`;
};

showSidebar();

feather.replace();

const logout = () => {
  localStorage.removeItem('authToken');
  window.location.href = 'login.html';
};

document.getElementById('logout-link').addEventListener('click', logout);
