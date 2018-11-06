/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('affiliations', {
    affiliation_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    affiliation_name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    affiliation_url: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'affiliations'
  });
};
