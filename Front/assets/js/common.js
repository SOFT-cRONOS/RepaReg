const getAuthToken = () => {
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    return authToken;
  } else {
    window.location.href = 'login.html';
  }
};
