const db = require('./utils/db');
const Entry = require('./models/Entry');
const Tag = require('./models/Tag');

async function seedDatabase() {
  try {
    // Синхронизируем базу (создаем таблицы если их нет)
    await db.sync({ force: true });
    console.log('Database synchronized');

    // Создаем теговые записи
    const entries = await Entry.bulkCreate([
      {
        title: 'Важная встреча',
        content: 'Обсуждение дипломного проекта с преподавателем в 15:00'
      },
      {
        title: 'Закупка материалов', 
        content: 'Купить краску и кисти для ремонта'
      },
      {
        title: 'Изучение React',
        content: 'Разобраться с хуками и компонентами'
      }
    ]);

    // Создаем теги
    const tags = await Tag.bulkCreate([
      { name: 'Работа' },
      { name: 'Учеба' },
      { name: 'Личное' },
      { name: 'Важное', parentId: 1 },
      { name: 'Проекты', parentId: 1 }
    ]);

    console.log('✅ Test data created:');
    console.log('- Entries:', entries.length);
    console.log('- Tags:', tags.length);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.close();
  }
}

seedDatabase();