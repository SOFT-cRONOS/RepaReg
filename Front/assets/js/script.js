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

