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
                credentials: 'include',
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
               credentials: 'include',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ email, password }),
           })
           .then(response => response.json())
           .then(data => {
               if (data.success) {
                   // Store the JWT token received from the server
                   sessionStorage.setItem('userEmail', email);
                   window.location.href = 'protected.html'; 
               } else {
                   alert('Login failed: ' + data.message);
               }
           })
           .catch(error => alert('Error during login: ' + error));
       });
   }

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
                credentials: 'include',
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
               credentials: 'include',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ email, password }),
           })
           .then(response => response.json())
           .then(data => {
               if (data.success) {
                   // Store the JWT token received from the server
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
       // Directly check session validity with the server
       fetch(`${serverBaseUrl}/check-session`, {
           method: 'GET',
           credentials: 'include', // Ensures cookies are sent with the request
       })
       .then(response => {
           if (response.ok) {
               // Session is valid, proceed to display protected content
               displayApiCallsMade();
           } else {
               // Session check failed, redirect to login page
               window.location.href = '/index.html';
           }
       })
       .catch(error => {
           console.error('Error:', error);
           window.location.href = '/index.html';
       });
   }
});

// Function to fetch and display the user's API call count
function displayApiCallsMade() {
   const userEmail = sessionStorage.getItem('userEmail');
   if (!userEmail) {
       console.error('User email not found in sessionStorage.');
       return;
   }

   // Fetch the API call count from the server using the userEmail
   fetch(`${serverBaseUrl}/api-calls-count?email=${encodeURIComponent(userEmail)}`, {
       method: 'GET',
       credentials: 'include'
   })
   .then(response => response.json())
   .then(data => {
       if (data.success && document.getElementById('apiCallsMade')) {
           document.getElementById('apiCallsMade').textContent = data.apiCallsMade;
       } else {
           console.error('Failed to fetch API call count:', data.message);
       }
   })
   .catch(error => {
       console.error('Error fetching API call count:', error);
   });
}

// Function to fetch and display the user's API call count
function displayApiCallsMade() {
   const userEmail = sessionStorage.getItem('userEmail');
   if (!userEmail) {
       console.error('User email not found in sessionStorage.');
       return;
   }

   // Fetch the API call count from the server using the userEmail
   fetch(`${serverBaseUrl}/api-calls-count?email=${encodeURIComponent(userEmail)}`, {
       method: 'GET',
       credentials: 'include'
   })
   .then(response => response.json())
   .then(data => {
       if (data.success && document.getElementById('apiCallsMade')) {
           document.getElementById('apiCallsMade').textContent = data.apiCallsMade;
       } else {
           console.error('Failed to fetch API call count:', data.message);
       }
   })
   .catch(error => {
       console.error('Error fetching API call count:', error);
   });
}});