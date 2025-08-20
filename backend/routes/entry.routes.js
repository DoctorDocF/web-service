const router = require('express').Router();
const controller = require('../controllers/entry.controller');

router.route('/')
  .get(controller.getAllEntries)
  .post(controller.createEntry);

router.route('/:id')
  .get(controller.getEntryById)
  .put(controller.updateEntry)
  .delete(controller.deleteEntry);

module.exports = router;