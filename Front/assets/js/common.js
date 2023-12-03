const getAuthToken = () => {
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    const exp = localStorage.getItem('exp');

    const fechaObj = new Date(exp);

    const fechaActual = new Date();

    if (fechaActual < fechaObj) {
      return authToken;
    } else {
      window.location.href = 'login.html';
    }
  } else {
    window.location.href = 'login.html';
  }
};
