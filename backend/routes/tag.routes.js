const router = require('express').Router();
const controller = require('../controllers/tag.controller');

router.route('/')
  .get(controller.getAllTags)
  .post(controller.createTag);

router.route('/:id')
  .get(controller.getTagById)
  .put(controller.updateTag)
  .delete(controller.deleteTag);

module.exports = router;