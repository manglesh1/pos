const { Tax } = require("../models");
const { apiResponse } = require("../helpers/APIresponse");

// Create a new Tax
const createTax = async (req, res) => {
  try {
    const tax = await Tax.create(req.body);
    return res
      .status(201)
      .json(apiResponse(201, "Tax created successfully", tax));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to create Tax", error.message));
  }
};

// Get all Taxes
const getAllTaxes = async (req, res) => {
  try {
    const taxes = await Tax.findAll();
    return res
      .status(200)
      .json(apiResponse(200, "Taxes retrieved successfully", taxes));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to retrieve Taxes", error.message));
  }
};

// Get a single Tax by ID
const getTaxById = async (req, res) => {
  try {
    const tax = await Tax.findByPk(req.params.id);
    if (!tax) {
      return res.status(404).json(apiResponse(404, "Tax not found"));
    }
    return res
      .status(200)
      .json(apiResponse(200, "Tax retrieved successfully", tax));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to retrieve Tax", error.message));
  }
};

// Update a Tax by ID
const updateTax = async (req, res) => {
  try {
    const [updated] = await Tax.update(req.body, {
      where: { taxId: req.params.id },
    });
    if (!updated) {
      return res.status(404).json(apiResponse(404, "Tax not found"));
    }
    const updatedTax = await Tax.findByPk(req.params.id);
    return res
      .status(200)
      .json(apiResponse(200, "Tax updated successfully", updatedTax));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to update Tax", error.message));
  }
};

// Delete a Tax by ID
const deleteTax = async (req, res) => {
  try {
    const deleted = await Tax.destroy({
      where: { taxId: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json(apiResponse(404, "Tax not found"));
    }
    return res.status(200).json(apiResponse(200, "Tax deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to delete Tax", error.message));
  }
};

module.exports = {
  createTax,
  getAllTaxes,
  getTaxById,
  updateTax,
  deleteTax,
};
