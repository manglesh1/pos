module.exports = (sequelize, DataTypes) => {
    const TicketVariation = sequelize.define(
      'TicketVariation',
      {
        ticketVariationId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        sessionPassId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'SessionPasses',
            key: 'sessionPassId',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        resourceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Resources',
            key: 'resourceId',
          }
        },
        timeAllocatedMinutes: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        tableName: 'TicketVariations',
        timestamps: true,
      }
    );
  
    TicketVariation.associate = (models) => {
      TicketVariation.belongsTo(models.SessionPass, {
        foreignKey: 'sessionPassId',
        as: 'sessionPass',
      });
      TicketVariation.belongsTo(models.Resource, {
        foreignKey: 'resourceId',
        as: 'resource',
      });
    };
  
    return TicketVariation;
  };
  