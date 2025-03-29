const { Model, DataTypes } = require('sequelize');

class BaseModel extends Model {
  static initWithVenue(attributes, options) {
    return super.init(
      {
        ...attributes,
        venueId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Venues',
            key: 'venueId',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      options
    );
  }

  static associateWithVenue(modelName) {
    this.belongsTo(modelName, {
      foreignKey: 'venueId',
      as: 'venue',
    });
  }
}

module.exports = BaseModel;
