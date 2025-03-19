const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/config.js");
const logger = require("../utils/logger.js");
const env = "development";

// Initialize Sequelize instance
const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
    dialectOptions: {
      options: {
        encrypt: false, // Adjust this based on your setup
        enableArithAbort: true,
      },
    },
    logging: (msg) => logger.info(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const db = {};

// Import all models dynamically
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js")) // Exclude this file and non-JS files
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Define associations (if any)
// Example: db.Venue.hasMany(db.Resource, { foreignKey: 'venueId', as: 'resources' });

// Assign Sequelize and sequelize instances to db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Sync models with the database
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database connection established successfully.");

    await sequelize.sync({ alter: true }); // Sync all models
    logger.info("Database synchronized successfully!");
  } catch (error) {
    logger.error("Failed to sync database:", error);
    process.exit(1);
  }
};

// Call the sync function
// syncDatabase();

module.exports = db;



// const Sequelize = require('sequelize');
// const config = require('../config/config.js');
// const logger = require('../utils/logger.js');
// const env = 'development';

// // Setup the Sequelize instance with proper retry logic
// const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
//   host: config[env].host,
//   dialect: config[env].dialect,
//   dialectOptions: {
//     options: {
//       encrypt: false, // Adjust this based on your setup
//       enableArithAbort: true,
//     },
//   },
//   logging: (msg) => logger.info(msg),
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Define retry function for the database connection
// const connectWithRetry = async (retries = 3, delay = 3000) => {
//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       await sequelize.authenticate();
//       logger.info('Database connection established successfully.');
//       return; // Exit the function if connection is successful
//     } catch (error) {
//       logger.error(`Attempt ${attempt} failed: ${error.message}`);
//       if (attempt < retries) {
//         logger.info(`Retrying in ${delay / 1000} seconds...`);
//         await new Promise((resolve) => setTimeout(resolve, delay));
//       } else {
//         logger.error('Max retries reached. Exiting the application.');
//         process.exit(1); // Exit the process after exhausting retries
//       }
//     }
//   }
// };

// // Call the retry function on startup
// (async () => {
//   await connectWithRetry();
//   await sequelize.sync({ alter: true });
//   logger.info('Database synchronized successfully!');
// })();

