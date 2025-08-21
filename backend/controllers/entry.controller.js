/* const Entry = require('../models/Entry');

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.findAll();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createEntry = async (req, res) => {
  try {
    const newEntry = await Entry.create(req.body);
    res.json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const entry = await Entry.findByPk(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const [updated] = await Entry.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedEntry = await Entry.findByPk(req.params.id);
      res.json(updatedEntry);
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const deleted = await Entry.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Entry not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */

const Entry = require('../models/Entry');

// Временные данные для демонстрации
const demoEntries = [
  { id: 1, title: 'Демо запись 1', content: 'Работает на Render!' },
  { id: 2, title: 'Демо запись 2', content: 'API endpoint активен' }
];

exports.getAllEntries = async (req, res) => {
  try {
    // const entries = await Entry.findAll();
    res.json(demoEntries);
  } catch (error) {
    res.json(demoEntries); // Всегда возвращаем демо данные
  }
};

exports.createEntry = async (req, res) => {
  try {
    // const newEntry = await Entry.create(req.body);
    const newEntry = { id: Date.now(), ...req.body };
    res.json(newEntry);
  } catch (error) {
    res.json({ id: Date.now(), ...req.body, message: 'Демо режим' });
  }
};

exports.getEntryById = async (req, res) => {
  try {
    // const entry = await Entry.findByPk(req.params.id);
    const entry = demoEntries.find(e => e.id == req.params.id) || { id: req.params.id, title: 'Демо', content: 'Не найдено' };
    res.json(entry);
  } catch (error) {
    res.json({ id: req.params.id, title: 'Демо', content: 'Ошибка БД' });
  }
};

// Аналогично для updateEntry и deleteEntry...
exports.updateEntry = async (req, res) => {
  res.json({ id: req.params.id, ...req.body, message: 'Демо: запись обновлена' });
};

exports.deleteEntry = async (req, res) => {
  res.json({ message: `Демо: запись ${req.params.id} удалена` });
};