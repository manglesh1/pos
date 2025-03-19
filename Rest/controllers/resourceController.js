const { Resource } = require("../models");
const { apiResponse } = require("../helpers/APIresponse");

// Create a new Resource
const createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    return res
      .status(201)
      .json(apiResponse(201, "Resource created successfully", resource));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to create Resource", error.message));
  }
};

// Get all Resources
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    return res
      .status(200)
      .json(apiResponse(200, "Resources retrieved successfully", resources));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to retrieve Resources", error.message));
  }
};

// Get a single Resource by ID
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json(apiResponse(404, "Resource not found"));
    }
    return res
      .status(200)
      .json(apiResponse(200, "Resource retrieved successfully", resource));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to retrieve Resource", error.message));
  }
};

// Update a Resource by ID
const updateResource = async (req, res) => {
  try {
    const [updated] = await Resource.update(req.body, {
      where: { resourceId: req.params.id },
    });
    if (!updated) {
      return res.status(404).json(apiResponse(404, "Resource not found"));
    }
    const updatedResource = await Resource.findByPk(req.params.id);
    return res
      .status(200)
      .json(apiResponse(200, "Resource updated successfully", updatedResource));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to update Resource", error.message));
  }
};

// Delete a Resource by ID
const deleteResource = async (req, res) => {
  try {
    const deleted = await Resource.destroy({
      where: { resourceId: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json(apiResponse(404, "Resource not found"));
    }
    return res
      .status(200)
      .json(apiResponse(200, "Resource deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to delete Resource", error.message));
  }
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};
