const { Categoria, Produto } = require('../models');

function buscarCategorias() {
  return Categoria.findAll({
    include: { model: Produto, as: 'produtos' },
    order: [['nome', 'ASC']]
  });
}

async function listar(req, res) {
  const categorias = await buscarCategorias();
  res.render('categorias/index', { categorias, erro: null });
}

async function criar(req, res) {
  const nome = (req.body.nome || '').trim();

  if (!nome) {
    return res.redirect('/categorias');
  }

  const existe = await Categoria.findOne({ where: { nome } });

  if (existe) {
    const categorias = await buscarCategorias();
    return res.render('categorias/index', { categorias, erro: 'Essa categoria já existe.' });
  }

  await Categoria.create({ nome });
  res.redirect('/categorias');
}

async function deletar(req, res) {
  await Categoria.destroy({ where: { id: req.params.id } });
  res.redirect('/categorias');
}

module.exports = { listar, criar, deletar };
