-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2023 a las 14:05:51
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reparegbd`
--
CREATE DATABASE IF NOT EXISTS `reparegbd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `reparegbd`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `detalle` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `cuit_cuil` varchar(20) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_venta`
--

CREATE TABLE `detalle_venta` (
  `id` int(11) NOT NULL,
  `id_venta` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_servicio` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio_unit` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



--
-- Disparadores `detalle_venta`
--
DELIMITER $$
CREATE TRIGGER `actualiza_stock_producto` AFTER INSERT ON `detalle_venta` FOR EACH ROW IF NEW.id_producto IS NOT NULL THEN
     -- Restar la cantidad vendida al stock del producto
     UPDATE producto
     SET stock = stock - NEW.cantidad
     WHERE id = NEW.id_producto;
 END IF
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `detalle` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `precio_compra` decimal(10,0) DEFAULT NULL,
  `precio_venta` decimal(10,0) DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `cuit_cuil` varchar(11) DEFAULT NULL,
  `nombre` varchar(25) DEFAULT NULL,
  `apellido` varchar(25) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `direccion` varchar(30) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

CREATE TABLE `venta` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `id_cliente` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_servicio` (`id_servicio`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_venta` (`id_venta`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_marca` (`id_marca`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `venta`
--
ALTER TABLE `venta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- AUTO_INCREMENT de la tabla `venta`
--
ALTER TABLE `venta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `detalle_venta`
--
ALTER TABLE `detalle_venta`
  ADD CONSTRAINT `detalle_venta_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `detalle_venta_ibfk_3` FOREIGN KEY (`id_servicio`) REFERENCES `servicio` (`id`),
  ADD CONSTRAINT `detalle_venta_ibfk_4` FOREIGN KEY (`id_venta`) REFERENCES `venta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `producto_ibfk_5` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id`);

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


/* Procedimientos almacenados */

/* Reportes de ventas */
DELIMITER //

CREATE PROCEDURE lastWeekSell(IN usuario_id INT)
BEGIN
    SELECT
        DATE_FORMAT(fecha, '%d/%m') AS fecha,
        SUM(total) AS monto_total
    FROM venta
    WHERE id_usuario = usuario_id
    GROUP BY DATE_FORMAT(fecha, '%d/%m')
    ORDER BY fecha
    LIMIT 7;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE lastSellsCategory(IN usuario_id INT)
BEGIN
      SELECT
          categoria.nombre AS categoria,
          COUNT(*) AS cantidad_ventas
      FROM
          detalle_venta
          INNER JOIN producto ON detalle_venta.id_producto = producto.id
          INNER JOIN categoria ON producto.id_categoria = categoria.id
      WHERE producto.id_usuario = usuario_id
      GROUP BY categoria.nombre;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE lastSellServices(IN usuario_id INT)
BEGIN
    SELECT
        DATE_FORMAT(v.fecha, '%d/%m') AS fecha,
        COUNT(*) AS cantventas
    FROM venta v
    INNER JOIN detalle_venta dv ON v.id = dv.id_venta
    INNER JOIN servicio s ON dv.id_servicio = s.id
    WHERE v.fecha >= CURDATE() - INTERVAL 7 DAY
    AND v.id_usuario = usuario_id
    GROUP BY DATE_FORMAT(fecha, '%d/%m')
    ORDER BY fecha;
END //

DELIMITER ;
/* Fin Reportes de ventas */

/* Insert de pruebas */

/* Marcas */
INSERT INTO `marca` (`nombre`, `detalle`) VALUES
('Logitech', 'Marca de periféricos'),
('Samsung', 'Marca de monitores'),
('Microsoft', 'Marca de software'),
('Epson', 'Marca de impresoras'),
('Seagate', 'Marca de almacenamiento'),
('NVIDIA', 'Marca de tarjetas de video'),
('Corsair', 'Marca de memoria RAM'),
('Belkin', 'Marca de accesorios'),
('HP', 'Marca de periféricos'),
('Cisco', 'Marca de equipos de redes');

/* Usuarios */
INSERT INTO `usuario` (`cuit_cuil`, `nombre`, `apellido`, `password`, `imagen`, `direccion`, `telefono`, `email`) VALUES
('20345678901', 'Han', 'Solo', '123', 'assets/img/user/imagen_admin.png', 'Calle Principal', 123456789, 'admin@taller.com'),
('30456789012', 'Leia', 'Organa', '123', 'assets/img/user/imagen_user2.png', 'Avenida Central', 987654321, 'tecnico@taller.com'),
('30456789012', 'Anakin', 'Skywalker', '123', 'assets/img/user/imagen_user3.png', 'Avenida Central', 987654321, 'tecnico2@taller.com');


/* Clientes */
INSERT INTO `cliente` (`nombre`, `apellido`, `cuit_cuil`, `direccion`, `email`, `telefono`, `id_usuario`) VALUES
('Juan', 'Gómez', '20345678901', 'Calle 123', 'juan@gmail.com', '123456789', 1),
('Ana', 'López', '30456789012', 'Avenida Principal', 'ana@gmail.com', '987654321', 2),
('Eduardo', 'Martínez', '40567890123', 'Calle 456', 'eduardo@gmail.com', '456789012', 1),
('Laura', 'Fernández', '50678901234', 'Avenida Central', 'laura@gmail.com', '789012345', 2),
('Carlos', 'Rodríguez', '60789012345', 'Calle 789', 'carlos@gmail.com', '234567890', 1),
('María', 'Díaz', '70890123456', 'Avenida Secundaria', 'maria@gmail.com', '345678901', 2),
('Pedro', 'González', '80901234567', 'Calle 1011', 'pedro@gmail.com', '567890123', 1),
('Sofía', 'Pérez', '90112345678', 'Avenida Nueva', 'sofia@gmail.com', '678901234', 2),
('Miguel', 'Ramírez', '10234567890', 'Calle 1213', 'miguel@gmail.com', '789012345', 1),
('Isabel', 'Sánchez', '21345678901', 'Avenida Antigua', 'isabel@gmail.com', '890123456', 2);

--
-- categoria
--

INSERT INTO `categoria` (`id`, `nombre`, `detalle`) VALUES
(1, 'accesorios', ''),
(2, 'componentes', ''),
(3, 'impresoras', ''),
(4, 'software', '');

/* Productos */
INSERT INTO `producto` (`nombre`, `id_categoria`, `id_usuario`, `stock`, `precio_compra`, `precio_venta`, `id_marca`) VALUES
('Teclado mecánico', 1, 1, 20, '40.00', '60.00', 1),
('Monitor LED 24"', 2, 2, 15, '120.00', '150.00', 2),
('Microsoft Office 365', 4, 1, 50, '80.00', '100.00', 3),
('Impresora láser', 3, 2, 10, '150.00', '200.00', 4),
('Disco duro externo 1TB', 2, 1, 30, '50.00', '80.00', 5),
('Tarjeta de video GTX 1660', 2, 2, 5, '200.00', '250.00', 6),
('Memoria RAM 8GB DDR4', 2, 1, 25, '30.00', '50.00', 7),
('Router inalámbrico', 1, 2, 15, '40.00', '60.00', 10),
('Ratón gaming', 1, 1, 12, '25.00', '40.00', 8),
('Switch Ethernet 8 puertos', 1, 2, 8, '60.00', '80.00', 10);

/* Servicios */
INSERT INTO `servicio` (`nombre`, `precio`, `descripcion`, `id_usuario`) VALUES
('Reparación de software', '80.00', 'Reparación de sistemas operativos y programas', 1),
('Actualización de hardware', '120.00', 'Mejora de componentes hardware de la computadora', 2),
('Configuración de red', '60.00', 'Configuración de redes locales y Wi-Fi', 1),
('Recuperación de datos', '150.00', 'Recuperación de datos perdidos o eliminados', 2),
('Instalación de software', '40.00', 'Instalación y configuración de programas', 1),
('Limpieza de virus', '100.00', 'Eliminación de virus y malware', 2),
('Asesoramiento tecnológico', '30.00', 'Asesoramiento en la compra de equipos y tecnología', 1),
('Optimización del sistema', '50.00', 'Mejora del rendimiento del sistema operativo', 2),
('Reparación de hardware', '80.00', 'Reparación de componentes hardware', 1),
('Mantenimiento preventivo', '60.00', 'Revisión y mantenimiento periódico de equipos', 2);


/* Ventas */
INSERT INTO `venta` (`id_usuario`, `fecha`, `id_cliente`, `total`) VALUES
(1, '2023-11-28 10:15:00', 6, 250),
(2, '2023-11-28 09:45:00', 7, 450),
(1, '2023-11-28 08:30:00', 8, 700),
(2, '2023-11-28 07:00:00', 9, 150),
(1, '2023-11-27 23:30:00', 10, 350),
(2, '2023-11-27 22:45:00', 1, 600),
(1, '2023-11-27 21:15:00', 2, 200),
(2, '2023-11-27 20:00:00', 3, 400),
(1, '2023-11-27 19:30:00', 4, 550),
(2, '2023-11-27 18:00:00', 5, 300);

/* Detalle de ventas */
INSERT INTO `detalle_venta` (`id_venta`, `id_producto`, `id_servicio`, `cantidad`, `precio_unit`) VALUES
(1, 1, NULL, 2, '50.00'),
(1, 2, NULL, 1, '30.00'),
(2, 3, NULL, 3, '25.00'),
(2, NULL, 1, 1, '100.00'),
(3, 4, NULL, 5, '10.00'),
(3, NULL, 2, 2, '150.00'),
(4, 5, NULL, 1, '200.00'),
(4, NULL, 3, 3, '50.00'),
(5, 6, NULL, 4, '40.00'),
(5, NULL, 4, 2, '120.00'),
(6, 1, NULL, 2, '50.00'),
(6, 2, NULL, 1, '30.00'),
(7, 3, NULL, 3, '25.00'),
(8, NULL, 1, 1, '100.00'),
(8, 4, NULL, 5, '10.00'),
(9, NULL, 2, 2, '150.00'),
(9, 5, NULL, 1, '200.00'),
(10, NULL, 3, 3, '50.00'),
(10, 6, NULL, 4, '40.00'),
(10, NULL, 4, 2, '120.00');
