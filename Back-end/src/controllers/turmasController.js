const { Turma } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Turma, 'id_turma');
