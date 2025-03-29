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
        encrypt: false,
        enableArithAbort: true,
        trustServerCertificate: true,
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
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define retry function for the database connection
const connectWithRetry = async (retries = 3, delay = 3000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sequelize.authenticate();
      logger.info("Database connection established successfully.");
      return;
    } catch (error) {
      logger.error(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt < retries) {
        logger.info(`Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        logger.error("Max retries reached. Exiting the application.");
        process.exit(1);
      }
    }
  }
};

// Manually import all models
db.UiTable = require("./uiTable")(sequelize, Sequelize.DataTypes);
db.Role = require("./role")(sequelize, Sequelize.DataTypes);
db.User = require("./user")(sequelize, Sequelize.DataTypes);
db.RolePermission = require("./rolePermission")(sequelize, Sequelize.DataTypes);
db.SessionProduct = require("./sessionProduct")(sequelize, Sequelize.DataTypes);
db.ProductVariation = require("./productVariation")(
  sequelize,
  Sequelize.DataTypes
);
db.Resource = require("./resource")(sequelize, Sequelize.DataTypes);
db.ProductVariationResource = require("./productVariationResource")(
  sequelize,
  Sequelize.DataTypes
);

// Define all associations manually
db.Role.belongsToMany(db.UiTable, {
  through: db.RolePermission,
  foreignKey: "roleId",
  as: "permissions",
});

db.UiTable.belongsToMany(db.Role, {
  through: db.RolePermission,
  foreignKey: "uiTableId",
  as: "roles",
});

db.SessionProduct.hasMany(db.ProductVariation, {
  foreignKey: "sessionProductId",
  as: "variations",
});

db.ProductVariation.belongsTo(db.SessionProduct, {
  foreignKey: "sessionProductId",
  as: "sessionProduct",
});

db.ProductVariation.belongsToMany(db.Resource, {
  through: db.ProductVariationResource,
  foreignKey: "productVariationId",
  as: "resources",
});

db.Resource.belongsToMany(db.ProductVariation, {
  through: db.ProductVariationResource,
  foreignKey: "resourceId",
  as: "productVariations",
});

db.UiTable.hasMany(db.UiTable, {
  foreignKey: "parentId",
  as: "children",
});

// Syncing the database with enhanced error handling and logs
async function syncDatabase() {
  try {
    await sequelize.authenticate(); // Test the connection first
    logger.info('Connection to the database established successfully.');
    
    // Sync models based on your needs
    await sequelize.sync({ alter: true });
    logger.info('Database & tables synced successfully!');
  } catch (error) {
    logger.error('Error syncing database:', error.message);
  }
}

syncDatabase(); // Call the sync function

module.exports = db;