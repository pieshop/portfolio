/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_frameworks', {
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
    framework_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'frameworks',
        key: 'framework_id'
      }
    }
  }, {
    tableName: 'entries_frameworks'
  });
};
