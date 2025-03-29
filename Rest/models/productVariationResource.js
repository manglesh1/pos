module.exports = (sequelize, DataTypes) => {
  const ProductVariationResource = sequelize.define(
    "ProductVariationResource",
    {
      productVariationId: {
        type: DataTypes.INTEGER,
        references: {
          model: "ProductVariations",
          key: "id",
        },
      },
      resourceId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Resources",
          key: "id",
        },
      },
    }
  );

  return ProductVariationResource;
};
