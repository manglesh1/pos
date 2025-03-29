const { DataTypes } = require('sequelize');
const BaseModel = require('./baseModel.js');

module.exports = (sequelize) => {
  class Resource extends BaseModel {
    static associate(models) {
      // Associate Resource with Venue using inherited method
      this.associateWithVenue(models.Venue);
    }
  }

  Resource.initWithVenue(
    {
      resourceName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookingRule: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn: [['single', 'multiple']], // Correct case
        },
      },
      productTypeRule: {
        type: DataTypes.STRING(25),
        allowNull: false,
         validate: {
          isIn: [['multiple_products', 'single_product', 'single_ticket_type']],
        },
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Resource',
      tableName: 'Resources',
      timestamps: true,
    }
  );

  return Resource;
};
