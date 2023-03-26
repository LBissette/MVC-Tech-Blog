const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const username = document.querySelector('#login-id').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard
        document.location.replace('/');

      } else {
        alert(await response.text());
      }
    }
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
  
