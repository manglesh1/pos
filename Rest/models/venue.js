module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define("Venue", {
    venueId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    legalBusinessName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    streetNumberOrBuildingName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    streetName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    townOrCity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    stateOrProvince: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    displayAddress: {
      type: DataTypes.STRING(500),
      allowNull: true, // Optional field
    },
    contactName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });

  // No associations for now
  return Venue;
};
