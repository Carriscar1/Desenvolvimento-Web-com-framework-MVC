const { Op } = require('sequelize');
const { Produto, Categoria } = require('../models');

const incluirCategoria = { model: Categoria, as: 'categoria' };

function dadosDoFormulario(body) {
  return {
    nome: body.nome,
    preco: body.preco,
    quantidade: body.quantidade || 0,
    categoriaId: body.categoriaId || null
  };
}

function buscarCategorias() {
  return Categoria.findAll({ order: [['nome', 'ASC']] });
}

async function listar(req, res) {
  const produtos = await Produto.findAll({
    include: incluirCategoria,
    order: [['nome', 'ASC']]
  });
  const categorias = await buscarCategorias();

  res.render('produtos/index', { produtos, categorias, busca: '' });
}

async function pesquisar(req, res) {
  const busca = (req.query.nome || '').trim();

  const produtos = await Produto.findAll({
    where: { nome: { [Op.like]: `%${busca}%` } },
    include: incluirCategoria,
    order: [['nome', 'ASC']]
  });
  const categorias = await buscarCategorias();

  res.render('produtos/index', { produtos, categorias, busca });
}

async function porCategoria(req, res) {
  const categoria = await Categoria.findByPk(req.params.id);

  if (!categoria) {
    return res.redirect('/produtos');
  }

  const produtos = await Produto.findAll({
    where: { categoriaId: categoria.id },
    order: [['nome', 'ASC']]
  });

  res.render('produtos/categoria', { categoria, produtos });
}

async function novo(req, res) {
  const categorias = await buscarCategorias();
  res.render('produtos/novo', { categorias });
}

async function criar(req, res) {
  await Produto.create(dadosDoFormulario(req.body));
  res.redirect('/produtos');
}

async function editar(req, res) {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.redirect('/produtos');
  }

  const categorias = await buscarCategorias();
  res.render('produtos/editar', { produto, categorias });
}

async function atualizar(req, res) {
  await Produto.update(dadosDoFormulario(req.body), { where: { id: req.params.id } });
  res.redirect('/produtos');
}

async function deletar(req, res) {
  await Produto.destroy({ where: { id: req.params.id } });
  res.redirect('/produtos');
}

module.exports = {
  listar,
  pesquisar,
  porCategoria,
  novo,
  criar,
  editar,
  atualizar,
  deletar
};
