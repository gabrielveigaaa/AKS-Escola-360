const { Aluno } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Aluno, 'id_aluno');
