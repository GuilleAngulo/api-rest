const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

const ProjectController = require('../controllers/ProjectController');

router.use(authMiddleware);

router.get('/', ProjectController.index);
router.get('/:projectId', ProjectController.find);
router.post('/', ProjectController.create);
router.put('/:projectId', ProjectController.update);
router.delete('/:projectId', ProjectController.remove);

module.exports = router;