# Cadastro de Produtos — MVC

Atividade prática de Web III: sistema de cadastro de produtos usando o padrão MVC com Node.js, Express, EJS, Sequelize e SQLite.

## Integrante

- Miguel Carriscar — RM 20240488

## Como executar

Precisa ter o Node.js instalado.

```bash
npm install
npm start
```

Depois é só abrir http://localhost:3000/produtos no navegador.

O arquivo `database.sqlite` é criado sozinho na primeira vez que o projeto roda.

## Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Exclusão de produtos
- Cadastro e exclusão de categorias
- Produtos por categoria
- Pesquisa de produtos por nome

## Estrutura

```
app.js
models/index.js          -> conexão com o SQLite e os models Produto e Categoria
controllers/             -> lógica de cada rota
routes/                  -> URLs de produtos e categorias
views/produtos/          -> páginas de listagem, cadastro, edição e filtro por categoria
views/categorias/        -> página de categorias
views/partials/          -> cabeçalho, rodapé e o select de categoria
```

## Desafios

**Desafio 1 — Categorias:** criei o model `Categoria` (id e nome) e liguei com o `Produto` usando `Categoria.hasMany(Produto)` e `Produto.belongsTo(Categoria)`. Com isso o Sequelize cria a coluna `categoriaId` na tabela de produtos como chave estrangeira. As categorias são cadastradas em `/categorias`, e nos formulários de produto tem um select para escolher a categoria. Na listagem aparece o nome da categoria usando `include` no `findAll`. Se uma categoria for excluída, os produtos dela ficam sem categoria (`onDelete: 'SET NULL'`).

**Desafio 2 — Produtos por categoria:** criei a rota `GET /produtos/categoria/:id`. O id vem por `req.params.id`, o controller busca a categoria com `findByPk` e depois os produtos com `findAll({ where: { categoriaId } })`. O resultado aparece na página `views/produtos/categoria.ejs`. Para escolher a categoria tem links na página de produtos, na própria tabela e na página de categorias.

**Desafio extra — Pesquisa:** criei a rota `GET /produtos/pesquisa?nome=...`, que usa `Op.like` do Sequelize com `%termo%` para trazer os produtos cujo nome contém o que foi digitado.
