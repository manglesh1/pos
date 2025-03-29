module.exports = (req, res, next) => {
    // Extract venueId from request headers, JWT, or session
    req.venueId = req.headers['x-venue-id'] || null;
  
    if (!req.venueId) {
      return res.status(400).json({ error: 'Venue ID is required.' });
    }
  
    next();
  };
  