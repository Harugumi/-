document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code for the home page
    // This will be executed when the DOM is fully loaded
  
    // Logout function
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', async function () {
            const response = await fetch('/logout', {
                method: 'GET',
            });
  
            // Redirect to login page after logout
            window.location.href = '/';
        });
    }
  });
  