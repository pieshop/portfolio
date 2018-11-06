/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('entries', {
    entry_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    entry_title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    entry_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    entry_responsibilities: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    entry_year: {
      type: "YEAR(4)",
      allowNull: false,
      defaultValue: '2017'
    },
    entry_week: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      defaultValue: '1'
    },
    entry_key: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true
    },
    entry_isactive: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    entry_isfeatured: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    entry_isnda: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    entry_issummary: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    entry_isresponsive: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    ModifiedTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    CreatedTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'entries'
  });
};
