module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: 'Roles',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['roleName'],
        },
      ],
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'roleId',
      as: 'users',
    });
    Role.belongsToMany(models.UI, {
      through: models.RoleUI,
      foreignKey: 'roleId',
      as: 'uiPaths',
    });
  };

  return Role;
};
