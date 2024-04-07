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
  
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
     
            fetch(`${serverBaseUrl}/index`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    sessionStorage.setItem('userEmail', email); // Store user email in session
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
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                window.location.href = '/index.html';
            } else {
                displayApiCallsMade();
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

    fetch(`${serverBaseUrl}/api-calls-count?email=${encodeURIComponent(userEmail)}`, {
        method: 'GET',
        credentials: 'include' // This might be necessary for accessing secure routes
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if(document.getElementById('apiCallsMade')) {
                document.getElementById('apiCallsMade').textContent = data.apiCallsMade;
            }
        } else {
            console.error('Failed to fetch API call count:', data.message);
        }
    })
    .catch(error => console.error('Error fetching API call count:', error));
}
