const { DataTypes } = require('sequelize');
const BaseModel = require('./baseModel.js');

module.exports = (sequelize) => {
  class User extends BaseModel {
    static associate(models) {
      // Associate User with Role
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
      });

      // Associate User with Venue using inherited method
      this.associateWithVenue(models.Venue);
    }
  }

  User.initWithVenue(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'roleId',
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
    }
  );

  return User;
};
