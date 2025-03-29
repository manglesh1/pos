module.exports = (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Roles",
          key: "id",
        },
      },
      uiTableId: {
        type: DataTypes.INTEGER,
        references: {
          model: "UiTables",
          key: "id",
        },
      },
      canView: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      canEdit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      canDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return RolePermission;
};
