/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_technologies', {
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
    tech_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'technologies',
        key: 'tech_id'
      }
    }
  }, {
    tableName: 'entries_technologies'
  });
};
