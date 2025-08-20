const Sequelize = require('sequelize');
const config = require('./config');

// Для Render всегда используем PostgreSQL
if (process.env.RENDER === 'true') {
  const db = new Sequelize(config.DATABASE_URI, {
    dialect: 'postgres',
    dialectModule: require('pg'), // ← Явно указываем pg модуль
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
  console.log('✅ Using PostgreSQL on Render');
  module.exports = db;
} else {
  // Для локальной разработки - MySQL
  const db = new Sequelize(config.DATABASE_URI, {
    dialect: 'mysql',
    dialectModule: require('mysql2'), // ← Явно указываем mysql2 модуль
    logging: false
  });
  console.log('✅ Using MySQL locally');
  module.exports = db;
}