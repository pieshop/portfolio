/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_links', {
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
    link_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'links',
        key: 'link_id'
      }
    }
  }, {
    tableName: 'entries_links'
  });
};
