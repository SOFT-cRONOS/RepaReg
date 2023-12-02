const URL_BASE = "http://localhost:5200";

const obtenerReporte = async () => {
  const authToken = getAuthToken();

  const url = `${URL_BASE}/reportes/reporte_total_ventas_x_servicio?authToken=${authToken}`;

  const response = await fetch(url);
  const data = await response.json();

  mostrarReporteEnTabla(data);
};

const mostrarReporteEnTabla = (reporte) => {
  const datosTabla = document.getElementById("datos-tabla");

  let html = "";

  //Dibujar la tabla de servicios
  reporte.forEach((producto) => {
    html += `<tr>
              <td>${producto.nombre}</td>
              <td>${producto.cantidad}</td>             
              <td>$ ${producto.total}</td>             
            </tr>`;
  });

  datosTabla.innerHTML = html;
};

obtenerReporte();
