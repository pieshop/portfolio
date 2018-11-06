/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_platforms', {
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
    platform_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'platforms',
        key: 'platform_id'
      }
    }
  }, {
    tableName: 'entries_platforms'
  });
};
