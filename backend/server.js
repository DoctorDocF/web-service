require('dotenv').config();
const express = require('express');
const cors = require('cors'); // добавьте эту строку

const app = express();

// Добавьте CORS middleware
app.use(cors());

// Остальной код остается без изменений
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const entryRoutes = require('./routes/entry.routes');
const tagRoutes = require('./routes/tag.routes');

app.use('/api/entries', entryRoutes);
app.use('/api/tags', tagRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});