/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clients', {
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    client_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_key: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_logo: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'clients'
  });
};
