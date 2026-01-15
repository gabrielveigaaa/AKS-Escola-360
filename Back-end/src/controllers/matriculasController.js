const { Matricula } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Matricula, 'id_matricula');
