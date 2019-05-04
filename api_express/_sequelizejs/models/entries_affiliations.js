/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_affiliations', {
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
    affiliation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'affiliations',
        key: 'affiliation_id'
      }
    }
  }, {
    tableName: 'entries_affiliations'
  });
};