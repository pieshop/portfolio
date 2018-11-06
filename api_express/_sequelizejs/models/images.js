/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    image_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    image_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    tableName: 'images'
  });
};
