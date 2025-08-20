const Sequelize = require('sequelize');
const config = require('./config');

const isProduction = process.env.NODE_ENV === 'production';

const db = new Sequelize(config.DATABASE_URI, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: isProduction ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

module.exports = db;