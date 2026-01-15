const express = require('express');
const router = express.Router();

router.use('/usuarios', require('./usuarios'));
router.use('/perfis', require('./perfis'));
router.use('/professores', require('./professores'));
router.use('/alunos', require('./alunos'));
router.use('/turmas', require('./turmas'));
router.use('/disciplinas', require('./disciplinas'));
router.use('/turma-disciplinas', require('./turmaDisciplinas'));
router.use('/matriculas', require('./matriculas'));
router.use('/avaliacoes', require('./avaliacoes'));
router.use('/notas', require('./notas'));
router.use('/frequencias', require('./frequencias'));

module.exports = router;
