module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define("Resource", {
    resourceId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingRule: {
      type: DataTypes.ENUM("Single", "Multi"),
      allowNull: false,
      defaultValue: "Single",
    },
  });

  // No associations for now
  return Resource;
};
