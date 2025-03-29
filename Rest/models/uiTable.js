const role = require("./role");

module.exports = (sequelize, DataTypes) => {
  const UiTable = sequelize.define("UiTable", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    menuItem: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    route: {
      type: DataTypes.STRING(100),
    },
    icon: {
      type: DataTypes.STRING(50),
    },
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "UiTables",
        key: "id",
      },
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: role,
        key: "id",
      },
    },
  });

  UiTable.associate = (models) => {
    role.belongsToMany(models.UiTable, {
      through: models.RolePermission,
      foreignKey: "roleId",
      as: "permissions",
    });
    UiTable.hasMany(models.UiTable, {
      foreignKey: "parentId",
      as: "children",
    });
  };

  return UiTable;
};
