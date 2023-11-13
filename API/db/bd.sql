DROP DATABASE RepaRegBD;
CREATE USER 'reparegadmin'@'localhost' IDENTIFIED BY '7cronos1';
CREATE DATABASE RepaRegBD;
GRANT ALL PRIVILEGES ON RepaRegBD.* TO 'reparegadmin'@'localhost';



USE RepaRegBD;

-- ######################
-- ## seccion usuarios ##
-- ######################

--  Tabla información de usuarios
CREATE TABLE usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nick VARCHAR(10),
  cuit VARCHAR(11),
  cuil VARCHAR(11),
  nombre VARCHAR(25),
  apellido VARCHAR(25),
  pass VARCHAR(64), --  técnicas de hash para almacenar contraseñas
  imagen VARCHAR(255),
  direccion VARCHAR(30),
  telefono INT (11),
  mail VARCHAR(50)
);


--  Tabla roles de usuario
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50),
    detalle VARCHAR(150)
);


--  Tabla permisos de roles
CREATE TABLE permiso (
    id_permiso INT AUTO_INCREMENT PRIMARY KEY,
    permiso VARCHAR(10),
    detalle VARCHAR(150)
);

--  Tabla asociar usuarios con roles
CREATE TABLE usuarios_roles (
    id_usuario INT,
    id_rol INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);



--  Tabla asociar roles con permisos
CREATE TABLE rol_permiso (
    id_rol INT,
    id_permiso INT,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol),
    FOREIGN KEY (id_permiso) REFERENCES permiso(id_permiso)
);

-- Insert datos prueba
INSERT INTO usuario
(`nick`, `cuit`, `cuil`, `nombre`, `apellido`, `pass`, `imagen`, `direccion`, `telefono`, `mail`) 
VALUES 
('tester', '24373764406', '24373764406', 'persona', 'testeo', '1234', 'https://cdn-icons-png.flaticon.com/512/1503/1503151.png', 'colon 104', '123', 'tester@gmail.com'),
('tester2', '24373765406', '24373864406', 'persona', 'testeo', '1234', 'https://cdn-icons-png.flaticon.com/512/1503/1503151.png', 'colon 104', '123', 'tester@gmail.com');

INSERT INTO roles 
(rol, detalle) 
VALUES
('CLIENTE', 'CLiente de la empresa'),
('TECNICO', 'Empleado tecnico reparador');

INSERT INTO permiso
(permiso, detalle)
VALUES
('crear', 'puede crear ventas, reparacions pero no eliminar ni dar de baja'),
('editar', ''),
('eliminar',''),
('ver',''),
('eliminar','');

INSERT INTO usuarios_roles
(id_usuario, id_rol) VALUES
(2, 1), -- El usuario 2 es cliente
(1, 2); -- El usuario 1 es tecnico

INSERT INTO rol_permiso
(id_rol, id_permiso) VALUES
(2, 1), -- tecnico puede crear
(2, 2), -- tecnico puede editar
(2, 4), -- tecnico puede ver
(1, 4); -- CLIENTE puede ver

-- creacion de indices

-- ## Fin seccion usuarios ##

-- #########################
-- ## seccion Taller ##
-- #########################

CREATE TABLE estado (  -- Estado del producto (nuevo, refaccionado)
    id_estado INT AUTO_INCREMENT PRIMARY KEY, 
    nombre_estado VARCHAR(50),
    detalle VARCHAR(150)
);


CREATE TABLE marca (
    id_marca INT AUTO_INCREMENT PRIMARY KEY,
    nombre_marca VARCHAR(50),
    detalle VARCHAR(150)
);

CREATE TABLE unidadmedida (
    id_um INT AUTO_INCREMENT PRIMARY KEY,
    nombre_um VARCHAR(50),
    detalle VARCHAR(150)
);

CREATE TABLE ubicacion (
    id_ubic INT AUTO_INCREMENT PRIMARY KEY,
    nombre_ubic VARCHAR(10),
    detalle VARCHAR(150)
);

CREATE TABLE tipo_item ( -- SI ENTRA UNA NOTEBOOK, TELE, AUTO, MOTO
    id_tipoitem INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipitem VARCHAR(10),
    detalle_tipitem VARCHAR(150)
);

CREATE TABLE categoria ( -- categoria de producto, si es un producto, serivico, repuesto
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cat VARCHAR(10),
    detalle_cat VARCHAR(150)
);

CREATE TABLE categoria_item(
    id_catitem INT AUTO_INCREMENT PRIMARY KEY,
    nombre_catitem VARCHAR(10),
    detalle_catitem VARCHAR(150)
);

CREATE TABLE proveedor (
    id_prov INT AUTO_INCREMENT PRIMARY KEY,
    nombre_prov VARCHAR(50),
    detalle VARCHAR(150)
);

-- INsert datos prueba

INSERT INTO estado 
(nombre_estado, detalle) VALUES
('Nuevo', 'Producto nuevo de fabrica'),
('Refaccionado', 'Reparado 100% funcional');

INSERT INTO marca 
(nombre_marca, detalle) VALUES
('Asus', ''),
('B&D',''),
('HP',''),
('Fiat','');

INSERT INTO unidadmedida
(nombre_um, detalle) VALUES
('ml', 'mililitros'),
('unidad', 'de a uno'),
('l', 'litros'),
('gs', 'gramos');

INSERT INTO ubicacion 
(nombre_ubic, detalle) VALUES
('E1A','ESTANTE 1 BANDEJA A'),
('C3A','CAJONERA 3 CAJON A'),
('3923','MUEBLE 3 ORDEN 923');

INSERT INTO tipo_item
(nombre_tipitem, detalle_tipitem) VALUES
('PC', 'pc de escritorio'),
('notebook', 'notebook portatil'),
('Moto', 'motovehiculo');

INSERT INTO categoria 
(nombre_cat, detalle_cat) VALUES
('insumo','perifericos, tintas, aceite'),
('repuesto',''),
('servicio','');

INSERT INTO proveedor
(nombre_prov, detalle) VALUES
('gadnic','importador chino'),
('Rombo avellaneda', 'venta repuestos punta alta');


-- tabla de items que entran en reparacion
CREATE TABLE item (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    nombre_item VARCHAR(25),
    color VARCHAR(20),
    id_usuario INT,  
    -- id_categoria INT este no va, reemplaza id_tipoitem
    id_ubicacion INT,
    id_marca INT,
    car_extra1 varchar(20), -- caracteristica extra
    car_extra2 varchar(20), -- caracteristica extra
    id_tipoitem INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    -- FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria) este no va reemplaza id_tipoitem
    FOREIGN KEY (id_ubicacion) REFERENCES ubicacion (id_ubic),
    FOREIGN KEY (id_marca) REFERENCES marca (id_marca),
    FOREIGN KEY (id_tipoitem) REFERENCES tipo_item (id_tipoitem) -- auto, moto, notebook, pc, (corregir en grafico)
);

INSERT INTO item
(nombre_item, color, id_usuario, id_ubicacion, id_marca, car_extra1, car_extra2, id_tipoitem) VALUES
('NOTEBOOK ', 'Azul', 2, 1, 1, '15 pulgadas','', 2); -- la notebook es del cliente, usuario 2.

-- tabla de repuestos
CREATE TABLE producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_articulo VARCHAR(20), 
    id_categoria INT, -- SERVICIO, INSUMO, REPUESTO
    id_usuario INT,
    cantidad INT,
    id_ubic INT,
    id_um INT,
    precio_compra DECIMAL,
    margen_ganancia DECIMAL,
    precio_venta DECIMAL,
    id_marca INT,
    condicion VARCHAR(50),
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_ubic) REFERENCES ubicacion(id_ubic),
    FOREIGN KEY (id_um) REFERENCES unidadmedida(id_um),
    FOREIGN KEY (id_marca) REFERENCES marca(id_marca)
);

INSERT INTO producto 
(nombre_articulo, id_categoria, id_usuario, cantidad, id_ubic, id_um, precio_compra, margen_ganancia, precio_venta, id_marca, condicion) VALUES
('MEMORIA RAM', 1, 1, 2, 2, 2, 12000, 6000, 18000, 3, 'Nuevo');
INSERT INTO producto 
(nombre_articulo, id_categoria, id_usuario, id_um, precio_compra, margen_ganancia, precio_venta) VALUES
('Activar windows', 3, 1, 2,5000, 50, 10000 );

-- consulta para descontar  o sumar stock
DECLARE @descuento INT;
SET @descuento = 1;
UPDATE producto SET cantidad = cantidad + @descuento;

CREATE TABLE transaccion ( -- movimnientos de ingreso item a reparar
    id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
    tipo_trans VARCHAR(10), -- reparacion o venta
    estado BOOLEAN, -- 0 pendiente, 1 terminado
    fecha_init DATE,
    fecha_fin DATE,
    id_responsable INT,
    id_item INT,
    informe VARCHAR(200),
    detalle VARCHAR(200)
);

INSERT INTO transaccion
(tipo_trans, estado, fecha_init, fecha_fin, id_responsable, id_item, informe, detalle) VALUES
('reparacion',0, '2023/11/13', 1, 1, 'falta activar windows', 'no tiene cargador'),
('reparacion', 1, '2023/11/10','2023/11/10', 1, 1, 'Ampliar memoria ram', 'se le coloca una memoira ram extra');


ALTER TABLE transaccion
ADD FOREIGN KEY (id_responsable) REFERENCES usuario(id_usuario),
ADD FOREIGN KEY (id_item) REFERENCES item(id_item);

CREATE TABLE detalle_transaccion (
    id_transaccion INT,
    id_producto INT, -- Si se agrega algun repuesto o servicio
    cantidad INT, 
    precio_unit DECIMAL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

-- al generar un detalle transaccion se debe descontar stock si es un repuesto.
INSERT INTO detalle_transaccion 
(id_transaccion, id_producto, cantidad, precio_unit) VALUES
(1, 2, 1, 10000),
(2,1,1, 18000);

-- ## Fin seccion Taller ##

-- #########################
-- ## seccion Facturacion ##
-- #########################

-- Tabla de Factura

CREATE TABLE factura (
    id_factura INT AUTO_INCREMENT PRIMARY KEY,
    n_factura INT,
    tipo VARCHAR(20), -- A C CONSUMIDOR FINAL ...
    fecha DATE,
    fecha_emision DATE,
    id_transaccion INT,
    descuento DECIMAL(10, 2),
    subtotal DECIMAL(10, 2), -- no va,
    total DECIMAL(10, 2), -- nova se autocalculan con el detalle
    id_cliente INT,
    id_responsable INT,
    estado_pago VARCHAR(10), -- parcial o pagado
    FOREIGN KEY (id_transaccion) REFERENCES transaccion(id_transaccion)
);



CREATE TABLE detalle_factura (
    id_factura INT,
    id_rep INT, -- si se cobra una reparacion (para ver el informe detallado)
    id_producto INT, -- quitar, esto se ve en la transaccion
    detalle VARCHAR(40),
    cantidad INT,
    precio_unit DECIMAL(10, 2),
    descuento_unit INT,
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura)
);

-- al generar una factura se debe pasar el estado de la transaccion de reparado a terminado
-- tomar el valor de la reparacion y cargarlo en el detalle.


CREATE TABLE tipo_pago (
    id_tipopago INT AUTO_INCREMENT PRIMARY KEY,
    tipopago VARCHAR(5),
    detalle VARCHAR(100)
);

CREATE INDEX id_tipopago_index ON tipo_pago (id_tipopago);

INSERT INTO tipo_pago (tipopago, detalle) VALUES
    ('MP', 'Mercado Pago cuenta 2032'),
    ('E', 'Efectivo');


CREATE TABLE detalle_pago (
    id_factura INT,
    id_tipopago INT,
    fecha DATE,
    monto DECIMAL(10, 2),
    detalle VARCHAR(40),
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura),
    FOREIGN KEY (id_tipopago) REFERENCES tipo_pago(id_tipopago)
);


-- ## Fin seccion Facturacion ##

-- ## Consultas para el dashboard ##

    -- Pedir trabajos en pendiente
    SELECT * FROM transaccion 
    WHERE estado = 0 
    AND tipo_trans = 'reparacion';

    -- Consultar los trabajos terminados en la ultima semanna (en el front contar los registros)
    SELECT * FROM transaccion 
    WHERE estado = 1 
    AND tipo_trans = 'reparacion'
    AND fecha_fin BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW(); 
    --now() la fecha de hoy, Date_sub saca las fechas en 7 ATRAS. between da verdadero si esta en ese rango
    -- para el grafico convertir las cantidades y agrupar por fechas (ver)

    -- Consultar total de ventas en el dia
    SELECT * FROM factura
    WHERE fecha = NOW();

    -- Consultar ultimos ingresos para grafico
    SELECT total FROM factura
    ORDER BY fecha;
    -- en el front convertir los totales en un array json para el grafico

    -- Suma de las 'ventas' y 'reparaciones' (no esta testeado)
    SELECT SUM(total) AS total_sum FROM factura 
    INNER JOIN transaccion ON factura.id_transaccion = transaccion.id_transaccion 
    WHERE transaccion.tipo_trans = 'reparacion'; -- trae los registros de factura solo cuando la transaccion es reparacion o venta
    SELECT SUM(total) AS total_sum FROM factura 
    INNER JOIN transaccion ON factura.id_transaccion = transaccion.id_transaccion 
    WHERE transaccion.tipo_trans = 'venta'
    -- para el grafico de torta (separar en dos valores ej: reparacion 140000, venta 100000)

-- ## Updates para botones ##

    -- # Menu Clientes
        -- Ver listado clientes
        SELECT u.*
        FROM usuario u
        JOIN usuarios_roles ur ON u.id_usuario = ur.id_usuario
        JOIN roles r ON ur.id_rol = r.id_rol
        WHERE r.rol = 'CLIENTE';
    -- # Menu Taller 
        -- ver reparaciones pendientes
        SELECT *
        FROM transaccion
        WHERE tipo_trans = 'reparacion' AND estado = 0
        ORDER BY fecha_init ASC;
        -- ver reparaciones terminadas
        SELECT *
        FROM transaccion
        WHERE tipo_trans = 'reparacion' AND estado = 1
        ORDER BY fecha_init ASC;

    -- Actualizar el estado de la transacción a "terminado"
        UPDATE transaccion
        SET estado = 1
        WHERE id_transaccion = 1;

    -- # secuencia para update de factura
        -- Obtener la información de la transacción de reparación que se va a factura
        SELECT *
        FROM transaccion
        WHERE id_transaccion = 1; -- id de transaccion al click boton "cobrar"

        -- Insertar la información de la factura
        INSERT INTO factura (n_factura, tipo, fecha, fecha_emision, id_transaccion, descuento, subtotal, total, id_cliente, id_responsable, estado_pago)
        VALUES
        (12345, 'A', '2023/11/13', '2023/11/13', 1, 0, 0, 0, 2, 1, 'pago');

        -- Obtener el ID de la factura recién insertada
        SET @id_factura = LAST_INSERT_ID();

        -- Insertar el detalle de la factura (tomando los datos de la transaccion)
        INSERT INTO detalle_factura (id_factura, id_rep, detalle, cantidad, precio_unit, descuento_unit)
        VALUES
        (@id_factura, 1, 'Cobro de reparación', 1, 5000, 0);

