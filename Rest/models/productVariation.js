module.exports = (sequelize, DataTypes) => {
  const ProductVariation = sequelize.define("ProductVariation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sessionProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: "SessionProducts",
        key: "id",
      },
    },
  });

  ProductVariation.associate = (models) => {
    ProductVariation.belongsTo(models.SessionProduct, {
      foreignKey: "sessionProductId",
      as: "sessionProduct",
    });

    ProductVariation.belongsToMany(models.Resource, {
      through: "ProductVariationResources",
      foreignKey: "productVariationId",
      as: "resources",
    });
  };

  return ProductVariation;
};
