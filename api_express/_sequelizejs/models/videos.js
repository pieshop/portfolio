/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('videos', {
    video_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    video_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    }
  }, {
    tableName: 'videos'
  });
};
