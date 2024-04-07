document.addEventListener('DOMContentLoaded', function() {
    const serverBaseUrl = 'https://milestone1server-4a2e0b56cbf7.herokuapp.com';
  
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
  
            fetch(`${serverBaseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/index.html';
                } else {
                    alert('Registration failed: ' + data.message);
                }
            })
            .catch(error => alert('Error during registration: ' + error));
        });
    }
  
   // Handling login form submission
   const loginForm = document.getElementById('login-form');
   if (loginForm) {
       loginForm.addEventListener('submit', function(event) {
           event.preventDefault();
           const email = document.getElementById('email').value;
           const password = document.getElementById('password').value;
     
           fetch(`${serverBaseUrl}/login`, {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ email, password }),
           })
           .then(response => response.json())
           .then(data => {
               if (data.success) {
                   // Store the JWT token received from the server
                   sessionStorage.setItem('token', data.token);
                   sessionStorage.setItem('userEmail', email);
                   window.location.href = 'protected.html'; 
               } else {
                   alert('Login failed: ' + data.message);
               }
           })
           .catch(error => alert('Error during login: ' + error));
       });
   }

    const isProtectedPage = window.location.pathname.includes('protected');
    if (isProtectedPage) {
        const token = sessionStorage.getItem('token');
        if (!token) {
            window.location.href = '/index.html';
        } else {
            fetch(`${serverBaseUrl}/check-session`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    window.location.href = '/index.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.href = '/index.html';
            });
        }
    }

    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const inputs = document.getElementById('inputs').value;
            const token = sessionStorage.getItem('token');
  
            fetch(`${serverBaseUrl}/generate-quote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ inputs }),
            })
            .then(response => response.json())
            .then(data => {
                // Handle response data
                console.log(data);
            })
            .catch(error => alert('Error generating quote: ' + error));
        });
    }
});
