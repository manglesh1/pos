const { SessionProduct, ProductVariation, Resource } = require("../models");
const { apiResponse } = require("../helpers/APIresponse");

const createSessionProduct = async (req, res) => {
  try {
    const { name, variations } = req.body;

    // Create session product
    const sessionProduct = await SessionProduct.create({ name });

    // Create variations and associate resources
    const createdVariations = await Promise.all(
      variations.map(async (variation) => {
        const newVariation = await ProductVariation.create({
          name: variation.name,
          sessionProductId: sessionProduct.id,
        });

        if (variation.resourceIds && variation.resourceIds.length > 0) {
          await newVariation.setResources(variation.resourceIds);
        }

        return newVariation;
      })
    );

    // Fetch complete product with relations
    const result = await SessionProduct.findByPk(sessionProduct.id, {
      include: [
        {
          model: ProductVariation,
          as: "variations",
          include: [
            {
              model: Resource,
              as: "resources",
              attributes: ["id", "name", "capacity"],
            },
          ],
        },
      ],
    });

    return res
      .status(201)
      .json(apiResponse(201, "Session product created successfully", result));
  } catch (error) {
    console.error("Error creating session product:", error);
    return res
      .status(500)
      .json(
        apiResponse(500, "Failed to create session product", error.message)
      );
  }
};

const getSessionProducts = async (req, res) => {
  try {
    const products = await SessionProduct.findAll({
      include: [
        {
          model: ProductVariation,
          as: "variations",
          include: [
            {
              model: Resource,
              as: "resources",
              attributes: ["id", "name", "capacity"],
            },
          ],
        },
      ],
    });

    return res
      .status(200)
      .json(
        apiResponse(200, "Session products retrieved successfully", products)
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        apiResponse(500, "Failed to retrieve session products", error.message)
      );
  }
};

module.exports = {
  createSessionProduct,
  getSessionProducts,
};
