const express = require('express');
var fs = require("fs/promises");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar 
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const dados = await fs.readFile('./talker.json', 'utf-8');
  if (!dados) return res.status(200).json([]);
  res.status(200).json(JSON.parse(dados));
});

app.listen(PORT, () => {
  console.log('Online');
});
