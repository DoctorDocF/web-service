/* const express = require('express');
const db = require('./backend/db');
const entryRoutes = require('./backend/routes/entry.routes');
const tagRoutes = require('./backend/routes/tag.routes');
const cors = require('cors');

const app = express();


// Более безопасный CORS (рекомендуется)
app.use(cors({
  origin: function (origin, callback) {
    // Разрешаем запросы без origin (Postman, curl)
    if (!origin) return callback(null, true);
    
    // Разрешаем локальную разработку и Render
    if (origin.includes('localhost') || origin.includes('render.com') || origin.includes('web-service-7qzl.onrender.com')) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/entries', entryRoutes);
app.use('/api/tags', tagRoutes);

// Health check endpoint для Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Обработка 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Обработка ошибок
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
}); */

const express = require('express');
const sequelize = require('./backend/db');
const entryRoutes = require('./backend/routes/entry.routes');
const tagRoutes = require('./backend/routes/tag.routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000; // ← Важно для Render!

// CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.includes('localhost') || origin.includes('render.com')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Корневой route
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Server is running on Render!',
    endpoints: ['/health', '/api/entries', '/api/tags'],
    port: PORT
  });
});

// Routes
app.use('/api/entries', entryRoutes);
app.use('/api/tags', tagRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    database: 'connected',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Запуск с обработкой ошибок БД
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('✅ Database synced');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });