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

  // Evento de envío del formulario para agregar un nuevo cliente
  nuevoClienteForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('pass').value;
      const avatar = document.getElementById('avatar').value;

      // Validar que se ingresen datos
      if (!nombre || !email) {
          alert('Por favor, complete todos los campos.');
          return;
      }

      // Enviar los datos del nuevo cliente a la API
      fetch('https://api.escuelajs.co/api/v1/users/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: nombre,
              email: email,
              password: password,
              avatar: avatar
          }),
      })
          .then(() => {
              // Limpiar los campos del formulario después de agregar el cliente
              document.getElementById('nombre').value = '';
              document.getElementById('email').value = '';

              // Recargar la lista de clientes para mostrar el nuevo cliente
              cargarClientes();
          })
          .catch((error) => console.error('Error al agregar cliente:', error));
  });
});

// #############  
//       Fin Api
// #############