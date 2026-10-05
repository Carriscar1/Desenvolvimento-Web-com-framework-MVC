const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtosController');

router.get('/', produtosController.listar);
router.get('/pesquisa', produtosController.pesquisar);
router.get('/categoria/:id', produtosController.porCategoria);
router.get('/novo', produtosController.novo);
router.post('/', produtosController.criar);
router.get('/:id/editar', produtosController.editar);
router.post('/:id', produtosController.atualizar);
router.post('/:id/deletar', produtosController.deletar);

module.exports = router;
