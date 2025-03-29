// models/stockItem.js
const BaseModel = require('./baseModel');

module.exports = (sequelize, DataTypes) => {
  class StockItem extends BaseModel {
    static associate(models) {
      // Associate StockItem with Venue using inherited method
      this.associateWithVenue(models.Venue);

      // A StockItem can have many variations
      StockItem.hasMany(models.StockItemVariation, {
        foreignKey: 'stockItemId',
        as: 'variations',
      });
    }
  }

  StockItem.initWithVenue(
    {
      stockItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      sku: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      costPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      retailPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      trackInventory: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      reorderThreshold: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(50),
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'StockItem',
      tableName: 'StockItems',
      timestamps: true,
    }
  );

  return StockItem;
};
