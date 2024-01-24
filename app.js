const express = require('express');
const bodyParser = require('body-parser');
const ActiveDirectory = require('activedirectory2');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const adConfig = {
  url: 'ldap://korndomain.com',
  baseDN: 'dc=korndomain,dc=com',
};

app.post('/authenticate', (req, res) => {
  const { username, password } = req.body;

  const ad = new ActiveDirectory({
    ...adConfig,
    username,
    password,
  });

  ad.authenticate(username, password, (err, auth) => {
    if (err) {
      res.json({ success: false, error: err.message });
    } else {
      // Authentication successful
      res.json({ success: true, redirectUrl: '/home' });
    }
  });
});

// Serve HTML page for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/0index.html');
});

app.get('/home', (req, res) => {
  res.sendFile(__dirname + '/views/1home.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
