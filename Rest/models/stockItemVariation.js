module.exports = (sequelize, DataTypes) => {
    const StockItemVariation = sequelize.define(
      'StockItemVariation',
      {
        variationId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        stockItemId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'StockItems', // Ensure this matches the table name of StockItem model
            key: 'stockItemId',
          }
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        additionalCost: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        additionalPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: true,
        },
        // Add any additional fields as needed
      },
      {
        tableName: 'StockItemVariations',
        timestamps: true,
      }
    );
  
    StockItemVariation.associate = (models) => {
      // Each variation belongs to one StockItem
      StockItemVariation.belongsTo(models.StockItem, {
        foreignKey: 'stockItemId',
        as: 'stockItem',
      });
    };
  
    return StockItemVariation;
  };
  