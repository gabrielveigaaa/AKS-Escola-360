const { Frequencia } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Frequencia, 'id_frequencia');
