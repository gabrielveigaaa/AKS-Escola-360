const express = require('express');
const router = express.Router();
const controller = require('../controllers/responsaveisController');

router.get('/', controller.list);
router.post('/', controller.create);
router.delete('/:alunoId/:usuarioId', controller.remove);

module.exports = router;
