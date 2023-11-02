// #############  
//       Api
// #############

document.addEventListener('DOMContentLoaded', () => {



  const nuevoClienteForm = document.getElementById('nuevo-cliente-form');
  const tabla = document.getElementById('tabla-clientes');
  const tbody = document.getElementById('datos-tabla-clientes');
  // Función para cargar la lista de clientes desde la API
  const cargarClientes = () => {
      fetch('https://api.escuelajs.co/api/v1/users')
      .then(response => response.json())
      .then((data) => {
          // Vaciar todas las filas del <tbody>
          while (tbody.firstChild) {
              tbody.removeChild(tbody.firstChild);
          }
          data.forEach((cliente) => {
              const fila = document.createElement('tr');
              fila.innerHTML = `
                  <td>${cliente.id}</td>
                  <td><img src=${cliente.avatar} width="50px"></td>
                  <td>${cliente.name}</td>
                  <td>${cliente.email}</td>
                  <td>
                  <a href="https://api.escuelajs.co/api/v1/users?id=${cliente.id}" class="btn btn-edit"> <i class="fas fa-edit"></i>Editar</a>
                  <a href="https://api.escuelajs.co/api/v1/users?id=${cliente.id}" class="btn btn-baja">Baja</a>
                  </td>
              `;
              tbody.appendChild(fila);
          });
      })
      .catch(error => console.error('Error al obtener la lista de clientes:', error));

  };

  // Llamar a la función para cargar clientes al cargar la página
  cargarClientes();

});

// #############  
//       Fin Api
// #############

// ##################################################################################
//                                 GRAFICOS DASHBOARD
// ##################################################################################

    // Paleta de colores
var colorPrimario = "#3c3a78";// violeta obscuro
var colorSecundario = "#948fc4"; // claro
var colorTerciario = "#77669d"; // medio

// Datos de ejemplo para los gráficos
  var dataLine = {
    labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
    datasets: [{
      label: 'Ingresos en los últimos 7 días',
    //   array de datos
      data: [100, 150, 120, 200, 180, 250, 210],
      fill: false,
      borderColor: colorPrimario,
      pointRadius: 5,
      backgroundColor: 'transparent',
      borderWidth: 4,
      pointBackgroundColor: colorPrimario
    }]
  };

  var dataBar = {
    labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
    datasets: [{
      label: 'Ingresos de equipos al taller en los últimos 7 días',
      //   array de datos
      data: [10, 15, 12, 20, 18, 25, 21],
      backgroundColor: colorTerciario
    }]
  };

  var dataPie = {
    labels: ['Ventas', 'Reparaciones'],
    datasets: [{
        //   array de datos
      data: [70, 30],
      backgroundColor: [colorPrimario, colorSecundario]
    }]
  };

  // Configuración de los gráficos
  var chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  var ctxLine = document.getElementById('lineChart').getContext('2d');
  var lineChart = new Chart(ctxLine, {
    type: 'line',
    data: dataLine,
    
  });

  var ctxBar = document.getElementById('barChart').getContext('2d');
  var barChart = new Chart(ctxBar, {
    type: 'bar',
    data: dataBar,
    options: chartOptions
  });

  var ctxPie = document.getElementById('pieChart').getContext('2d');
  var pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: dataPie,
    options: chartOptions
  });

// ##################################################################################
//                                FIN GRAFICOS DASHBOARD
// ##################################################################################