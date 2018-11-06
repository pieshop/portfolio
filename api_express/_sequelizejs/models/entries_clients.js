/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_clients', {
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
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'clients',
        key: 'client_id'
      }
    }
  }, {
    tableName: 'entries_clients'
  });
};
