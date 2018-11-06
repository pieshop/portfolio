/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries_videos', {
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
    video_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'videos',
        key: 'video_id'
      }
    }
  }, {
    tableName: 'entries_videos'
  });
};
