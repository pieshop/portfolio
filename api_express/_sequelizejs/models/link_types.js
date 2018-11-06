/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('link_types', {
    link_type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    link_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link_type_label: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'link_types'
  });
};
