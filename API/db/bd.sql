DROP DATABASE RepaRegBD;
-- CREATE USER 'admin'@'localhost' IDENTIFIED BY 'Cronos71@';
CREATE DATABASE RepaRegBD;
GRANT ALL PRIVILEGES ON RepaRegBD.* TO 'admin'@'localhost';

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
('tester', '24373764406', '24373764406', 'persona', 'testeo', '1234', 'https://cdn-icons-png.flaticon.com/512/1503/1503151.png', 'colon 104', '123', 'tester@gmail.com');

INSERT INTO roles 
(rol, detalle) 
VALUES
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
(1, 1); -- El usuario 1 es tecnico

INSERT INTO rol_permiso
(id_rol, id_permiso) VALUES
(1, 1),
(1, 2),
(1, 4);

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

CREATE TABLE categoria ( -- categoria de item, si es un producto, serivico, repuesto
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cat VARCHAR(10),
    detalle_cat VARCHAR(150)
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
    id_categoria INT,
    id_ubicacion INT,
    id_marca INT,
    car_extra1 varchar(20), -- caracteristica extra
    car_extra2 varchar(20), -- caracteristica extra
    id_tipoitem INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categoria (id_categoria),
    FOREIGN KEY (id_ubicacion) REFERENCES ubicacion (id_ubic),
    FOREIGN KEY (id_marca) REFERENCES marca (id_marca),
    FOREIGN KEY (id_tipoitem) REFERENCES tipo_item (id_tipoitem)
);

-- tabla de repuestos
CREATE TABLE producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_artiuculo VARCHAR(20), 
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

CREATE TABLE transaccion (
    id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
    tipo_trans VARCHAR(10),
    estado BOOLEAN,
    fecha_init DATE,
    fecha_fin DATE,
    id_responsable INT,
    id_item INT,
    informe VARCHAR(200),
    detalle VARCHAR(200)
);

ALTER TABLE transaccion
ADD FOREIGN KEY (id_responsable) REFERENCES usuario(id_usuario),
ADD FOREIGN KEY (id_item) REFERENCES item(id_item);

CREATE TABLE detalle_transaccion (
    id_transaccion INT,
    id_producto INT,
    cantidad INT, 
    precio_unit DECIMAL,
    FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);
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
    subtotal DECIMAL(10, 2),
    total DECIMAL(10, 2),
    id_cliente INT,
    id_responsable INT,
    estado_pago VARCHAR(10), -- parcial o pagado
    FOREIGN KEY (id_transaccion) REFERENCES transaccion(id_transaccion)
);

CREATE TABLE detalle_factura (
    id_factura INT,
    id_rep INT, -- si se cobra una reparacion
    id_producto INT, -- si se vende un repuesto solo
    detalle VARCHAR(40),
    cantidad INT,
    precio_unit DECIMAL(10, 2),
    descuento_unit INT,
    FOREIGN KEY (id_factura) REFERENCES factura(id_factura)
);

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