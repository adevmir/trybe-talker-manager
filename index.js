const express = require('express');
const fs = require('fs/promises');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const emailRegex = /^\w+(\[\+\.-\]?\w)*@\w+(\[\.-\]?\w+)*\.[a-z]+$/i;

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

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const valid = emailRegex.test(email);
  if ([email].includes(undefined)) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!valid) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if ([password].includes(undefined)) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
