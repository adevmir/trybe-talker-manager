module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (talk === undefined) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};