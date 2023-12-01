const URL_BASE = 'http://localhost:5200';



const login = async (event) => {
  event.preventDefault();

  localStorage.removeItem('authToken');
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  console.log(email, password);

  let url = `${URL_BASE}/usuarios/login`;
  let method = 'POST';

  const data = { email, password };

  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 200) {
    const result = await response.json();

    const authToken = result.token;

    localStorage.setItem('authToken', authToken);

    window.location.href = 'index.html';
  } else {
    alert('Datos incorrectos');
  }
};

document.getElementById('login-form').addEventListener('submit', login);
