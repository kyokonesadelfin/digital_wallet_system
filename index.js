const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let walletBalance = 0;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/balance', (req, res) => {
  res.send(`Your current balance is ${walletBalance}`);
});

app.post('/cash-in', (req, res) => {
  const amount = req.body.amount;
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).send('Invalid amount');
  }

  walletBalance += amount;
  res.send(`Successfully cashed in ${amount}. Your new balance is ${walletBalance}`);
});


app.post('/debit', (req, res) => {
  const amount = req.body.amount;
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).send('Invalid amount');
  }

  if (walletBalance < amount) {
    return res.status(400).send('Insufficient balance');
  }

  walletBalance -= amount;
  res.send(`Successfully debited ${amount}. Your new balance is ${walletBalance}`);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

// Run in program in http://localhost:3000