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

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const dados = await fs.readFile('./talker.json', 'utf-8');
  const user = JSON.parse(dados).find((item) => item.id === Number(id));
  if (!user) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log('Online');
});
