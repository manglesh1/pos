module.exports = (sequelize, DataTypes) => {
  const RoleUI = sequelize.define('RoleUI', {
    roleUiId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'roleId',
      },
    },
    uiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'UIs',
        key: 'uiId',
      },
    },
    permissionType: {
      type: DataTypes.ENUM('Read', 'Write'),
      allowNull: true,
    },
  });

  return RoleUI;
};
