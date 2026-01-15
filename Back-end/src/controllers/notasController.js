const { Nota } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Nota, 'id_nota');
