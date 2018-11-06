/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_images', {
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
    image_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'images',
        key: 'image_id'
      }
    }
  }, {
    tableName: 'entries_images'
  });
};
