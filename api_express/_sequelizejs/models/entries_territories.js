/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_territories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entry_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'entries',
        key: 'entry_id'
      }
    },
    territory_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'territories',
        key: 'territory_id'
      }
    }
  }, {
    tableName: 'entries_territories'
  });
};
