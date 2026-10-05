const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'Categorias'
});

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

Categoria.hasMany(Produto, { as: 'produtos', foreignKey: 'categoriaId' });
Produto.belongsTo(Categoria, { as: 'categoria', foreignKey: 'categoriaId', onDelete: 'SET NULL' });

module.exports = {
  sequelize,
  Produto,
  Categoria
};
