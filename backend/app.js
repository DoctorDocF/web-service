const express = require('express');
const db = require('./db');
const entryRoutes = require('./routes/entry.routes');
const tagRoutes = require('./routes/tag.routes');
const cors = require('cors');

const app = express();

// Более безопасный CORS (рекомендуется)
app.use(cors({
  origin: function (origin, callback) {
    // Разрешаем запросы без origin (Postman, curl)
    if (!origin) return callback(null, true);
    
    // Разрешаем локальную разработку и Render
    if (origin.includes('localhost') || origin.includes('render.com')) {
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
});