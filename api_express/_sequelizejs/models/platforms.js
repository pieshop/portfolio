/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platforms', {
    platform_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    platform_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 'platforms'
  });
};
