/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('territories', {
    territory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    territory_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 'territories'
  });
};
