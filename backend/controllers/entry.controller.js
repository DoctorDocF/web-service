const Entry = require('../models/Entry');

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
};