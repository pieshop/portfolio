/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('awards', {
    award_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    award_result: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    award_category: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    award_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    award_long_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    award_url_link: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    award_pdf_link: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'awards'
  });
};
