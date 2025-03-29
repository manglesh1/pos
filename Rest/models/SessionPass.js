const { DataTypes } = require('sequelize');
const BaseModel = require('./baseModel.js');

module.exports = (sequelize) => {
  class SessionPass extends BaseModel {
    static associate(models) {
      // Associate SessionPass with Venue using inherited method
      this.associateWithVenue(models.Venue);

      // Associate SessionPass with Resource
      SessionPass.belongsToMany(models.Resource, {
        through: 'SessionPassResources',
        foreignKey: 'sessionPassId',
        otherKey: 'resourceId',
        as: 'resources',
      });

      // Associate SessionPass with TicketVariation
      SessionPass.hasMany(models.TicketVariation, {
        foreignKey: 'sessionPassId',
        as: 'ticketVariations',
      });
    }
  }

  SessionPass.initWithVenue(
    {
      sessionPassId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      durationMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      allowConsecutiveSessions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      consecutiveSessionDiscountType: {
        type: DataTypes.ENUM('fixed', 'percentage'),
        allowNull: true,
      },
      consecutiveSessionDiscountValue: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      salesAvailabilityStart: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      salesAvailabilityCutoff: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      waiverRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bookingReminderDays: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      minPurchaseLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      maxPurchaseLimit: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      taxOverride: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'SessionPass',
      tableName: 'SessionPasses',
      timestamps: true,
    }
  );

  return SessionPass;
};
