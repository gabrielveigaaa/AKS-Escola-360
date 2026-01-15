const { Disciplina } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Disciplina, 'id_disciplina');
