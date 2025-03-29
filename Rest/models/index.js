const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.js');
const logger = require('../utils/logger.js');
const scopedModel = require('../utils/scopedModel');
const env = 'development';

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: 'postgres',
       
    logging: (msg) => logger.info(msg),
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Dynamically import models, excluding index.js, baseModel.js, and any file that doesn't export a function.
const modelsDir = path.join(__dirname);
fs.readdirSync(modelsDir)
  .filter((file) => {
    return (
      file !== 'index.js' &&
      file !== 'baseModel.js' && // Exclude BaseModel
      file.endsWith('.js')
    );
  })
  .forEach((file) => {
    const modelModule = require(path.join(modelsDir, file));
    // Only call the export if it's a function
    if (typeof modelModule === 'function') {
      const model = modelModule(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      logger.info(`Skipping file ${file} as it does not export a function.`);
    }
  });

// Define model associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Wrap models with scopedModel if needed
db.scopedModels = (venueId) => {
  const scoped = {};
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].rawAttributes && db[modelName].rawAttributes.venueId) {
      scoped[modelName] = scopedModel(db[modelName], venueId);
    } else {
      scoped[modelName] = db[modelName];
    }
  });
  return scoped;
};

// Sync database with error handling and logging
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    logger.info('Connection to the database established successfully.');
    await sequelize.sync({ alter: true });
    logger.info('Database & tables synced successfully!');
  } catch (error) {
    logger.error('Error syncing database:', error);
  }
}

syncDatabase();

module.exports = db;
