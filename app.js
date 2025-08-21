const express = require('express');
const path = require('path');
const sequelize = require('./backend/db');
const entryRoutes = require('./backend/routes/entry.routes');
const tagRoutes = require('./backend/routes/tag.routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

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

// ✅ ОБСЛУЖИВАНИЕ СТАТИЧЕСКИХ ФАЙЛОВ ФРОНТЕНДА
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Routes
app.use('/api/entries', entryRoutes);
app.use('/api/tags', tagRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ✅ ОБСЛУЖИВАНИЕ React app для всех остальных запросов
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// 404 handler (теперь не нужен, так как есть вышестоящий обработчик)
// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Запуск сервера
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log('✅ Frontend is being served');
});