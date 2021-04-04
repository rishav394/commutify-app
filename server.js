const express = require('express');

const app = express();

app.use(express.json());

app.all('*', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
