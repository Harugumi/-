document.addEventListener('DOMContentLoaded', async function () {
    // Get user information
    const userResponse = await fetch('/user');
    const userData = await userResponse.json();
  
    // Update user information in the navbar
    const userContainer = document.getElementById('userContainer');
    if (userContainer) {
      if (userData.username) {
        userContainer.innerHTML = `Welcome, ${userData.username}!`;
      } else {
        userContainer.innerHTML = 'Not logged in';
      }
    }
  
    // Display user information on the profile page
    const profileContent = document.querySelector('.profile-container .content');
    if (profileContent) {
      profileContent.innerHTML = `
        <h1>User Profile</h1>
        <p>Username: ${userData.username}</p>
        <p>Email: ${userData.email}</p>
        <!-- Add other user details as needed -->
      `;
    }
  });
  