'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    name: DataTypes.STRING,
    valor: DataTypes.DOUBLE,
    stock: DataTypes.SMALLINT,
    descripcion: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};