const { Avaliacao } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Avaliacao, 'id_avaliacao');
