const Tag = require('../models/Tag');

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
};