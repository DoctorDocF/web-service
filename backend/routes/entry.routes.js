exports.getAllEntries = (req, res) => {
  // Временные тестовые данные
  res.json([
    { id: 1, title: 'Тестовая запись 1', content: 'Это первая демо-запись' },
    { id: 2, title: 'Тестовая запись 2', content: 'Вторая демо-запись' }
  ]);
};

exports.createEntry = (req, res) => {
  res.json({
    message: 'Запись была бы создана',
    data: req.body
  });
};

exports.getEntryById = (req, res) => {
  res.json({
    id: Number(req.params.id),
    title: `Запись №${req.params.id}`,
    content: 'Демонстрационная запись'
  });
};

exports.updateEntry = (req, res) => {
  res.json({
    message: 'Запись была бы обновлена',
    updatedData: req.body
  });
};

exports.deleteEntry = (req, res) => {
  res.json({
    message: 'Запись была бы удалена',
    deletedId: req.params.id
  });
};