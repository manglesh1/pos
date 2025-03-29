const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const config = require('../config/config');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Find the user by username
    const user = await User.findOne({
        where: { email },
        include: [
          {
            model: Role,
            as: 'role',
            include: [
              {
                model: UI,
                as: 'uiPaths',  // This alias should match what you defined in your Role model association.
              },
            ],
          },
        ],
      });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    return res.json(user);

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};
