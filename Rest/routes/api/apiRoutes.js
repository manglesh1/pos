const { Router } = require('express');
const router = Router();
const retryMiddleware = require('../../middlewares/retryMiddleware'); // Import the retry middleware

// // Import controllers
// const gameroomTypeController = require('../../controllers/gameroomTypeController');

// // GameroomType routes
// router.post('/gameroomType/create', retryMiddleware(gameroomTypeController.create));

module.exports = router;