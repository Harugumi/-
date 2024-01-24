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

  // ตรวจสอบว่า req.body มีข้อมูล username และ password หรือไม่
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Invalid request. Username and password are required.' });
  }

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
      res.json({ success: true, redirectUrl: '/views/1home.html' });
    }
  });
});

app.get('/user', (req, res) => {
  const { username, password } = req.body;

  const ad = new ActiveDirectory({
    ...adConfig,
    username,
    password,
  });

  ad.findUser(username, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching user data from AD' });
    } else {
      res.json({ user });
    }
  });
});

// Serve HTML page for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/0index.html');
});

app.get('/views/1home.html', (req, res) => {
  res.sendFile(__dirname + '/views/1home.html');
});

app.get('/views/2profile.html', (req, res) => {
  res.sendFile(__dirname + '/views/2profile.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
