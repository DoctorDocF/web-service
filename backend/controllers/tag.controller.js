/* const Tag = require('../models/Tag');

exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTag = async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.json(newTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTag = async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedTag = await Tag.findByPk(req.params.id);
      res.json(updatedTag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */

const Tag = require('../models/Tag');

// Временные данные для демонстрации
const demoTags = [
  { id: 1, name: 'важное', color: '#ff0000' },
  { id: 2, name: 'работа', color: '#00ff00' },
  { id: 3, name: 'личное', color: '#0000ff' }
];

exports.getAllTags = async (req, res) => {
  try {
    // const tags = await Tag.findAll();
    res.json(demoTags);
  } catch (error) {
    res.json(demoTags); // Всегда возвращаем демо данные
  }
};

exports.createTag = async (req, res) => {
  try {
    // const newTag = await Tag.create(req.body);
    const newTag = { 
      id: Date.now(), 
      name: req.body.name || 'новый тег',
      color: req.body.color || '#888888'
    };
    res.json(newTag);
  } catch (error) {
    res.json({ 
      id: Date.now(), 
      name: req.body.name || 'демо тег',
      color: req.body.color || '#888888',
      message: 'Демо режим' 
    });
  }
};

exports.getTagById = async (req, res) => {
  try {
    // const tag = await Tag.findByPk(req.params.id);
    const tag = demoTags.find(t => t.id == req.params.id) || { 
      id: req.params.id, 
      name: 'демо тег', 
      color: '#888888' 
    };
    res.json(tag);
  } catch (error) {
    res.json({ 
      id: req.params.id, 
      name: 'ошибка', 
      color: '#ff0000',
      message: 'Ошибка БД' 
    });
  }
};

exports.updateTag = async (req, res) => {
  try {
    // const [updated] = await Tag.update(req.body, { where: { id: req.params.id } });
    // if (updated) {
    //   const updatedTag = await Tag.findByPk(req.params.id);
    //   res.json(updatedTag);
    // } else {
    //   res.status(404).json({ error: 'Tag not found' });
    // }
    res.json({
      id: req.params.id,
      name: req.body.name || 'обновленный тег',
      color: req.body.color || '#888888',
      message: 'Демо: тег обновлен'
    });
  } catch (error) {
    res.json({
      id: req.params.id,
      name: req.body.name || 'демо тег',
      color: req.body.color || '#888888',
      message: 'Демо режим (ошибка)'
    });
  }
};

exports.deleteTag = async (req, res) => {
  try {
    // const deleted = await Tag.destroy({ where: { id: req.params.id } });
    // if (deleted) {
    //   res.json({ message: 'Tag deleted' });
    // } else {
    //   res.status(404).json({ error: 'Tag not found' });
    // }
    res.json({ 
      message: `Демо: тег ${req.params.id} удален`,
      deletedId: req.params.id
    });
  } catch (error) {
    res.json({ 
      message: `Демо: тег ${req.params.id} удален (ошибка БД)`,
      deletedId: req.params.id
    });
  }
};