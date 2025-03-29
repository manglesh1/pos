const role = require("./role");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: role,
        key: "id",
      }
    },
  });

  // User.associate = (models) => {
  //   User.belongsToMany(models.Role, {
  //     through: models.UserRole,
  //     foreignKey: "userId",
  //     as: "roles",
  //   });
  // };

  User.associate = (models) => {
    role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: "roleId",
      as: "users",
    })
  };

  return User;
};
