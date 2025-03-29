require('dotenv').config({ path: './.env' });

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    host: process.env.DATABASE_HOST, // Ensure this is correctly set
    port: process.env.PORT
    
  }
};

