// #############
//       Api
// #############
// Función para cargar la lista de clientes desde la API
const cargarClientes = () => {
  /* const nuevoClienteForm = document.getElementById('nuevo-cliente-form');
  const tabla = document.getElementById('tabla-clientes');
  const tbody = document.getElementById('datos-tabla-clientes');


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
                <a href="https://api.escuelajs.co/api/v1/users?id=${cliente.id}" class="btn btn-edit"><span data-feather="home"></span>Editar</a>
                <a href="https://api.escuelajs.co/api/v1/users?id=${cliente.id}" class="btn btn-baja">Baja</a>
                </td>
            `;
            tbody.appendChild(fila);
            // ejecuta cambio de iconos paquete boostrap
            feather.replace();
        });
    })
    .catch(error => console.error('Error al obtener la lista de clientes:', error)); */
};

// #############
//       Fin Api
// #############

// ##################################################################################
//                                 GRAFICOS DASHBOARD
// ##################################################################################

// graficacion
// Paleta de colores
var colorPrimario = '#3c3a78'; // violeta obscuro
var colorSecundario = '#948fc4'; // claro
var colorTerciario = '#77669d'; // medio

function lastWeeksell() {
  const authToken = getAuthToken();
  const url = `${URL_BASE}/reportes/1?authToken=${authToken}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error:', error));
}

function sellsbyCat() {
  const authToken = getAuthToken();
  const url = `${URL_BASE}/reportes/2?authToken=${authToken}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error:', error));
}


// Datos de ejemplo para los gráficos
lastWeeksell().then(ultimasventas => {
  console.log(ultimasventas);
  var dataLine = {
    labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
    datasets: [
      {
        label: 'Ingresos en los últimos 7 días',
        //   array de datos
        data: ultimasventas,
        fill: false,
        borderColor: colorPrimario,
        pointRadius: 5,
        backgroundColor: 'transparent',
        borderWidth: 4,
        pointBackgroundColor: colorPrimario,
      },
    ],
  };

  var ctxLine = document.getElementById("lineChart").getContext("2d");
  var lineChart = new Chart(ctxLine, {
    type: "line",
    data: dataLine,
  });
});

sellsbyCat().then(ventasxcat => {
  console.log(ventasxcat);
  const categorias = [];
  const cantidades = [];
  ventasxcat.forEach(item => {
    categorias.push(item.categoria);
    cantidades.push(item.cantidad);
  });

  var dataPie = {
    labels: categorias,
    datasets: [
      {
        //   array de datos
        data: cantidades,
        backgroundColor: [colorPrimario, colorSecundario],
      },
    ],
  };

  var ctxPie = document.getElementById("pieChart").getContext("2d");
  var pieChart = new Chart(ctxPie, {
    type: "pie",
    data: dataPie,
    options: chartOptions,
  });
})


var dataBar = {
  labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
  datasets: [
    {
      label: 'Ingresos de equipos al taller en los últimos 7 días',
      //   array de datos
      data: [10, 15, 12, 20, 18, 25, 21],
      backgroundColor: colorTerciario,
    },
  ],
};



// Configuración de los gráficos
var chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
};



var ctxBar = document.getElementById("barChart").getContext("2d");
var barChart = new Chart(ctxBar, {
  type: "bar",
  data: dataBar,
  options: chartOptions,
});


// Fin graficacion

//  funcion animacion de numeros
function animar() {
  (function ($) {
    $.fn.countTo = function (options) {
      options = options || {};

      return $(this).each(function () {
        // set options for current element
        var settings = $.extend(
          {},
          $.fn.countTo.defaults,
          {
            from: $(this).data('from'),
            to: $(this).data('to'),
            speed: $(this).data('speed'),
            refreshInterval: $(this).data('refresh-interval'),
            decimals: $(this).data('decimals'),
          },
          options
        );

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;

        // references & variables that will change with each update
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data('countTo') || {};

        $self.data('countTo', data);

        // if an existing interval can be found, clear it first
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);

        // initialize the element with the starting value
        render(value);

        function updateTimer() {
          value += increment;
          loopCount++;

          render(value);

          if (typeof settings.onUpdate == 'function') {
            settings.onUpdate.call(self, value);
          }

          if (loopCount >= loops) {
            // remove the interval
            $self.removeData('countTo');
            clearInterval(data.interval);
            value = settings.to;

            if (typeof settings.onComplete == 'function') {
              settings.onComplete.call(self, value);
            }
          }
        }

        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };

    $.fn.countTo.defaults = {
      from: 0, // the number the element should start at
      to: 0, // the number the element should end at
      speed: 1000, // how long it should take to count between the target numbers
      refreshInterval: 100, // how often the element should be updated
      decimals: 0, // the number of decimal places to show
      formatter: formatter, // handler for formatting the value before rendering
      onUpdate: null, // callback method for every time the element is updated
      onComplete: null, // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  })(jQuery);

  jQuery(function ($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
      formatter: function (value, options) {
        return value
          .toFixed(options.decimals)
          .replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
      },
    });

    // start all the timers
    $('.timer').each(count);

    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data('countToOptions') || {});
      $this.countTo(options);
    }
  });
}
//  fin funcion animacion de numeros

// ##################################################################################
//                                FIN GRAFICOS DASHBOARD
// ##################################################################################
