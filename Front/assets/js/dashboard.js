/* globals Chart:false, feather:false */

const URL_BASE = 'http://localhost:5200';

const obtenerDatosTablero = async () => {
  const authToken = getAuthToken();

  const url = `${URL_BASE}/tablero?authToken=${authToken}`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  document
    .getElementById('total-ventas-hoy')
    .setAttribute('data-to', data.totalVentasHoy);

  document
    .getElementById('cant-ventas-hoy')
    .setAttribute('data-to', data.cantVentasHoy);

  document
    .getElementById('cant-clientes')
    .setAttribute('data-to', data.cantClientes);

  //dibujarGraficos();
  animar();
};

obtenerDatosTablero();

function dibujarGraficos() {
  feather.replace({ 'aria-hidden': 'true' });

  // Graphs
  var ctx = document.getElementById('myChart');
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      datasets: [
        {
          data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff',
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
}
