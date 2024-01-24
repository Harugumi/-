async function authenticate() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (result.success) {
    // Authentication successful, redirect to the specified URL
    window.location.href = result.redirectUrl;
  } else {
    // Authentication failed
    document.getElementById('result').innerHTML = '<p>Authentication failed</p>';
  }
}