const Sequelize = require('sequelize');
const config = require('./config');

// Определяем диалект по наличию Render environment variable
const isRender = process.env.RENDER === 'true';
const dialect = isRender ? 'postgres' : 'mysql';

const db = new Sequelize(config.DATABASE_URI, {
  dialect: dialect,
  logging: false,
  dialectOptions: isRender ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

console.log(`✅ Using ${dialect} database on ${isRender ? 'Render' : 'localhost'}`);

module.exports = db;