-<h3 align="center">Proyecto Informatico - grupo n° 24</h3>
integrantes:
Matías José Rivadeneira
Ríos Patricia Roxana
Donato Nicolas Miguel

# RepaReg
Software para gestion de taller de reparaciones.

Estructura de directorios

    
    API/
    |     |___config/
    |     |          |__conect.py 
    |     |___db/
    |     |          |__BDconfig.py
    |     |          |__db.py
    |     |          |__ init.py
    |     |___models/
    |     |     |__cliente.py
    |     |     |__producto.py
    |     |     |__servicio.p
    |     |      |__user.py
    |     |     |__venta.py
    |     |___routes
    |     |     |__ init.py
    |     |     |__ cliente.py
    |     |     |__ producto.py
    |     |     |__ reportes.py
    |     |     |__ servicio.py 
    |     |     |__ tablero.py
    |     |     |__ usuario.py
    |     |     |__ venta.py
    |     |____init__.py
    |     |___app.py
    |     |___utils.py
    | 
    Front/
    |     |__categorias.html
    |     |__clientes.html
    |     |__index.html
    |     |__login.html
    |     |__productos.html
    |     |__reporte_stock.html
    |     |__reporte_total_compras_x_clientes.html
    |     |__servicios.html
    |     |__ventas.html
    |
    Doc/
    |     |__API RepaReg.pdf
    |     |__diagrama_bd.drawio
    |     |__rutas_frontend.drawio
    .gitignore
    |
    README.md
    |
    main.py
    |
    reparegbd.sql
    |
    requeriments.txt



1. Crar directorio de proyecto
2. Crear entorno virtual. En windows py -3 -m venv .venv, en unix: python -m venv .venv
3. Activamos el entorno virtual en windows .venv\Scripts\acitvate. En unix: source .venv/bin/activate
4. Creamos el archivos de requerimientso, requirements.txt

            click==8.1.7
            colorama==0.4.6
            Flask==2.2.5
            importlib-metadata==6.7.0
            itsdangerous==2.1.2
            Jinja2==3.1.2
            MarkupSafe==2.1.3
            typing_extensions==4.7.1
            Werkzeug==2.2.3
            zipp==3.15.0
            flask-mysqldb == 1.0.1
            PyJWT == 2.8.0
            flask-cors

6. Instalar dependencias, pip install  -r requeriments.txt
7. Ejecutar modo debugger python main.py

* Base de datos en MySQL
    
    - UML (grafico de estructura de base de datos)

* Funciones de interfaz

    - Registro de clientes
    - Registro de productos
    - Registro de ventas
    - Historial de reparaciones

* Lenguajes

    - Python
    - MySQL
    - HTML
    - CSS
* Enlace al notion del api: https://www.notion.so/invite/af11327f1b070c2cb7fe62a8b892b90eb905a4ae
