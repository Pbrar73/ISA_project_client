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
       fetch(`${serverBaseUrl}/check-session`, {
           method: 'GET',
           credentials: 'include', 
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
   
 // Fetch and display users' API information on admin page
 const isAdminPage = window.location.pathname.includes('admin');
 if (isAdminPage) {
     fetch(`${serverBaseUrl}/admin/users`, {
         method: 'GET',
         credentials: 'include',
         headers: {
             'Content-Type': 'application/json',
         },
     })
     .then(response => response.json())
     .then(data => {
         if (data.success) {
             const usersTableBody = document.getElementById('users-table-body');
             data.users.forEach(user => {
                 const row = document.createElement('tr');
                 row.innerHTML = `
                     <td>${user.email}</td>
                     <td>${user.api_calls_made}</td>
                 `;
                 usersTableBody.appendChild(row);
             });
         } else {
             alert('Failed to fetch users\' API information: ' + data.message);
         }
     })
     .catch(error => alert('Error fetching users\' API information: ' + error));
 }
});