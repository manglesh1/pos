const { Venue } = require("../models");
const { apiResponse } = require("../helpers/APIresponse");

// Create a new Venue
const createVenue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    return res
      .status(201)
      .json(apiResponse(201, "Venue created successfully", venue));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to create Venue", error.message));
  }
};

// Get all Venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.findAll();
    return res
      .status(200)
      .json(apiResponse(200, "Venues retrieved successfully", venues));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to retrieve Venues", error.message));
  }
};

// Get a single Venue by ID
const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (!venue) {
      return res.status(404).json(apiResponse(404, "Venue not found"));
    }
    return res
      .status(200)
      .json(apiResponse(200, "Venue retrieved successfully", venue));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to retrieve Venue", error.message));
  }
};

// Update a Venue by ID
const updateVenue = async (req, res) => {
  try {
    const [updated] = await Venue.update(req.body, {
      where: { venueId: req.params.id },
    });
    if (!updated) {
      return res.status(404).json(apiResponse(404, "Venue not found"));
    }
    const updatedVenue = await Venue.findByPk(req.params.id);
    return res
      .status(200)
      .json(apiResponse(200, "Venue updated successfully", updatedVenue));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to update Venue", error.message));
  }
};

// Delete a Venue by ID
const deleteVenue = async (req, res) => {
  try {
    const deleted = await Venue.destroy({
      where: { venueId: req.params.id },
    });
    if (!deleted) {
      return res.status(404).json(apiResponse(404, "Venue not found"));
    }
    return res.status(200).json(apiResponse(200, "Venue deleted successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(apiResponse(500, "Failed to delete Venue", error.message));
  }
};

module.exports = {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
};
