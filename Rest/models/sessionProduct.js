module.exports = (sequelize, DataTypes) => {
  const SessionProduct = sequelize.define(
    "SessionProduct",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      tableName: "SessionProduct", // Add this to prevent pluralization
    }
  );

  SessionProduct.associate = (models) => {
    SessionProduct.hasMany(models.ProductVariation, {
      foreignKey: "sessionProductId",
      as: "variations",
    });
  };

  return SessionProduct;
};
