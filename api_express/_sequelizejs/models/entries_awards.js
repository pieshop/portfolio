/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_awards', {
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
    award_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'awards',
        key: 'award_id'
      }
    }
  }, {
    tableName: 'entries_awards'
  });
};
