exports.getAllTags = (req, res) => {
  // Временные тестовые данные
  res.json([
    { id: 1, name: 'Метка 1' },
    { id: 2, name: 'Метка 2' }
  ]);
};

exports.createTag = (req, res) => {
  res.json({
    message: 'Метка была бы создана',
    data: req.body
  });
};

exports.getTagById = (req, res) => {
  res.json({
    id: Number(req.params.id),
    name: `Метка №${req.params.id}`
  });
};

exports.updateTag = (req, res) => {
  res.json({
    message: 'Метка была бы обновлена',
    updatedData: req.body
  });
};

exports.deleteTag = (req, res) => {
  res.json({
    message: 'Метка была бы удалена',
    deletedId: req.params.id
  });
};