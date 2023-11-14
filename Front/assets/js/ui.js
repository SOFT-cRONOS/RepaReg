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
                                <a class="nav-link" href="inventario.html">
                                    <span data-feather="archive"></span>
                                    Servicios
                                </a>
                                </li>

                                <li class="nav-item">
                                <a class="nav-link" href="usuarios.html">
                                    <span data-feather="users"></span>
                                    Clientes
                                </a>
                                </li>

                                <li class="nav-item">
                                <a class="nav-link" href="usuarios.html">
                                    <span data-feather="users"></span>
                                    Ventas
                                </a>
                                </li>

                                <li class="nav-item">
                                <a class="nav-link" href="reportes.html">
                                    <span data-feather="bar-chart-2"></span>
                                    Reportes
                                </a>
                                </li>
                            </ul>
                        </div>`;
};

showSidebar();
