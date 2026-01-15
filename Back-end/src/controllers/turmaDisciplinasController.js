const { TurmaDisciplina } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(TurmaDisciplina, 'id_turma_disciplina');
