const Sequelize = require('sequelize');
const config = require('./config');

async function testConnection() {
  try {
    const db = new Sequelize(config.DATABASE_URI, {
      dialect: 'mysql',
      logging: console.log
    });
    
    await db.authenticate();
    console.log('✅ Подключение к MariaDB успешно!');
    
    // Проверим существующие таблицы
    const tables = await db.query("SHOW TABLES");
    console.log('📊 Таблицы в базе:', tables[0]);
    
    await db.close();
  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);
  }
}

testConnection();