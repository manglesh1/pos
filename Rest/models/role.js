module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING(255),
    },
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: "roleId",
      as: "users",
    });
    Role.belongsToMany(models.UiTable, {
      through: "RolePermissions",
      foreignKey: "roleId",
      as: "permissions",
    });
  };

  return Role;
};
