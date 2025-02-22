const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/accounts', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/data/accounts.json'));
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  fs.readFile(path.join(__dirname, 'src/data/accounts.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading accounts file');
    }
    const accounts = JSON.parse(data);
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    if (account) {
      res.status(200).send({ message: 'Login successful', account });
    } else {
      res.status(401).send({ message: 'Invalid username or password' });
    }
  });
});

app.post('/api/accounts', (req, res) => {
  const newAccount = req.body;
  fs.readFile(path.join(__dirname, 'src/data/accounts.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading accounts file');
    }
    const accounts = JSON.parse(data);
    // Check if the username already exists
    if (accounts.some(account => account.username === newAccount.username)) {
      return res.status(400).send('Username already exists');
    }
    accounts.push(newAccount);
    fs.writeFile(path.join(__dirname, 'src/data/accounts.json'), JSON.stringify(accounts, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing accounts file');
      }
      res.status(201).send({ message: 'Account created successfully' });
    });
  });
});

app.post('/api/update-items', (req, res) => {
  const cartItems = req.body;
  fs.readFile(path.join(__dirname, 'src/data/items.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading items file');
    }
    const items = JSON.parse(data);
    cartItems.forEach(cartItem => {
      const item = items.find(item => item.id === cartItem.id);
      if (item) {
        const size = item.sizes.find(size => size.size === cartItem.selectedSize);
        if (size) {
          size.quantity -= cartItem.quantity;
        }
      }
    });
    fs.writeFile(path.join(__dirname, 'src/data/items.json'), JSON.stringify(items, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing items file');
      }
      res.status(200).send({ message: 'Items updated successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});