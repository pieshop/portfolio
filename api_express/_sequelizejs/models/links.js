/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('links', {
    link_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    link_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link_target: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link_type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'link_types',
        key: 'link_type_id'
      }
    },
    window_width: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    window_height: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    link_label: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    link_isMobileFriendly: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'links'
  });
};
