const { Router } = require("express");
const router = Router();
const retryMiddleware = require("../../middlewares/retryMiddleware");

/*
// Import controllers
const venueController = require("../../controllers/venueController");
const taxController = require("../../controllers/taxController");
const resourceController = require("../../controllers/resourceController");
const sessionProductController = require("../../controllers/sessionProductController");

// Venue routes
router.post("/venue/create", retryMiddleware(venueController.createVenue));
router.get("/venue", retryMiddleware(venueController.getAllVenues));
router.get("/venue/:id", retryMiddleware(venueController.getVenueById));
router.put("/venue/:id", retryMiddleware(venueController.updateVenue));
router.delete("/venue/:id", retryMiddleware(venueController.deleteVenue));

// Tax routes
router.post("/tax/create", retryMiddleware(taxController.createTax));
router.get("/tax", retryMiddleware(taxController.getAllTaxes));
router.get("/tax/:id", retryMiddleware(taxController.getTaxById));
router.put("/tax/:id", retryMiddleware(taxController.updateTax));
router.delete("/tax/:id", retryMiddleware(taxController.deleteTax));

// Resource routes
router.post(
  "/resource/create",
  retryMiddleware(resourceController.createResource)
);
router.get("/resource", retryMiddleware(resourceController.getAllResources));
router.get(
  "/resource/:id",
  retryMiddleware(resourceController.getResourceById)
);
router.put("/resource/:id", retryMiddleware(resourceController.updateResource));
router.delete(
  "/resource/:id",
  retryMiddleware(resourceController.deleteResource)
);

router.post(
  "/session-product/create",
  retryMiddleware(sessionProductController.createSessionProduct)
);

router.get(
  "/session-products",
  retryMiddleware(sessionProductController.getSessionProducts)
);
*/
module.exports = router;
