const { DataTypes } = require('sequelize');
const db = require('../db');

const Tag = db.define('Tag', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  parentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Tags',
      key: 'id'
    }
  }
});

module.exports = Tag;