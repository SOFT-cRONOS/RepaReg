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

-- creacion de indices
-- CREATE INDEX idx_usuario ON usuario (id_usuario);
-- CREATE INDEX idx_rol ON roles (id_rol);
-- CREATE INDEX idx_permiso ON permisos (permiso);

-- ## Fin seccion usuarios ##

-- #########################
-- ## seccion Taller ##
-- #########################

CREATE TABLE estado (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50),
    detalle VARCHAR(150)
);

CREATE TABLE transaccion (
    id_transaccion INT AUTO_INCREMENT PRIMARY KEY,
    tipo_trans VARCHAR(10),
    id_estado INT,
    fecha_init DATE,
    fecha_fin DATE,
    id_responsable INT,
    id_cliente INT,
    id_item INT,
    informe VARCHAR(200),
    detalle VARCHAR(200)
);

ALTER TABLE transaccion
ADD FOREIGN KEY (id_estado) REFERENCES estado(id_estado),
ADD FOREIGN KEY (id_cliente) REFERENCES usuario(id_usuario),
ADD FOREIGN KEY (id_Responsable) REFERENCES usuario(id_usuario),
ADD FOREIGN KEY (id_item) REFERENCES item(id_item);

CREATE TABLE detalle_transaccion (
    id_transaccion INT,
    id_rep INT,
    cantidad INT, 
    precio_unit DECIMAL
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



-- tabla de items que entran en reparacion
CREATE TABLE item (
    id_item INT AUTO_INCREMENT PRIMARY KEY,
    nombre_item VARCHAR(25),
    id_categoria INT,
    id_usuario INT,    
    id_ubicacion INT,
    id_pieza INT, 
    id_um INT,
    id_marca INT,
    estado INT
);


-- tabla de repuestos
CREATE TABLE articulo (
    id_articulo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_artiuculo VARCHAR(20), 
    id_categoria INT,
    id_usuario INT,
    cantidad INT,
    id_ubic INT,
    id_um INT,
    precio_compra DECIMAL,
    margen_ganancia DECIMAL,
    precio_venta DECIMAL,
    id_marca INT,
    condicion VARCHAR(50)
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
    id_tipopago INT,
    tipopago VARCHAR(5),
    detalle VARCHAR(100)
);

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