/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('frameworks', {
    framework_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    framework_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    framework_url: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    tableName: 'frameworks'
  });
};
