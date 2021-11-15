'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ventas.init({
      /*
      cantidad y precio unitario de cada producto, fecha de venta, el documento de 
identificación y nombre del cliente, y, además, deberá contar con un 
encargado de gestionar dicha venta (vendedor)*/
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true
    },
    total: DataTypes.DOUBLE,
    cantidad: DataTypes.INTEGER,
    fecha: DataTypes.STRING,
    id_producto: DataTypes.BIGINT,
    valor_producto: DataTypes.DOUBLE,
    descripcion_producto: DataTypes.TEXT,
    cedula_cliente: DataTypes.INTEGER,
    nombre_cliente: DataTypes.STRING,
    email_vendedor: DataTypes.STRING,
    estado: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Ventas',
  });
  return Ventas;
};