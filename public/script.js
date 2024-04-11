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
                   if (data.is_admin) {
                    window.location.href = 'admin.html';
                } else {
                    window.location.href = 'protected.html';
                } 
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
   
 const isAdminPage = window.location.pathname.includes('admin');
 if (isAdminPage) {
     fetch(`${serverBaseUrl}/admin/users`, {
         method: 'GET',
         credentials: 'include',
         headers: {
             'Content-Type': 'application/json',
         },
     })
     .then(response => {
        if (response.status === 401 || response.status === 403) {
            window.location.href = 'index.html';
            return null;
        }
        return response.json(); 
    })     
    .then(data => {
         if (data.success) {
             const usersTableBody = document.getElementById('users-table-body');
             data.users.forEach(user => {
                 const row = document.createElement('tr');
                 row.innerHTML = `
                    <td>${user.email}</td>
                    <td>${user.api_calls_made}</td>
                    <td>
                        <button class="delete-user-btn" data-user-id="${user.id}">Delete User</button>
                    </td>
                `;
                usersTableBody.appendChild(row);
             });
         } else {
             alert('Failed to fetch users\' API information: ' + data.message);
         }
     })
     .catch(error => alert('Must be admin to access this page.'));

     document.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-user-btn')) {
            const userId = event.target.getAttribute('data-user-id');
            if (userId) {
                fetch(`${serverBaseUrl}/admin/users/${userId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete user');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        alert('User successfully deleted');
                        window.location.reload();
                    } else {
                        alert('Failed to delete user: ' + data.message);
                    }
                })
                .catch(error => console.error('Error:', error));
            } else {
                console.error('User ID is undefined');
            }
        }
    });
}

const emailUpdateForm = document.getElementById('email-update-form');
if (emailUpdateForm) {
    emailUpdateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newEmail = document.getElementById('new-email').value;
        
        fetch(`${serverBaseUrl}/users/email`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newEmail }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Email updated successfully.');
            } else {
                alert('Email update failed: ' + data.message);
            }
        })
        .catch(error => alert('Error updating email: ' + error));
    });
}


 function fetchAndDisplayApiUsage() {
    const serverBaseUrl = 'https://milestone1server-4a2e0b56cbf7.herokuapp.com';
    fetch(`${serverBaseUrl}/api-usage`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch API usage data');
        }
        return response.json();
    })
    .then(data => {
        if (data.success && data.apiCallsMade !== undefined) {
            document.getElementById('apiCallsMade').textContent = data.apiCallsMade;
        } else {
            console.error('Failed to load API usage data:', data.message);
        }
    })
    .catch(error => {
        console.error('Error fetching API usage data:', error);
    });
}


if (window.location.href.toLowerCase().endsWith('/protected.html')) {
    fetchAndDisplayApiUsage();
}
});