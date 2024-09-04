const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  const name = `Name_${Math.floor(Math.random() * 1000)}`;
  db.query(`INSERT INTO people(name) VALUES('${name}')`, (err, result) => {
    if (err) {
      return res.status(500).send('Database error');
    }

    db.query('SELECT name FROM people', (err, results) => {
      if (err) {
        return res.status(500).send('Database error');
      }

      const names = results.map(row => row.name).join(', ');
      res.send(`<h1>Full Cycle Rocks!</h1><p>${names}</p>`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
