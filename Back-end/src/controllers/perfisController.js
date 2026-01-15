const { Perfil } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Perfil, 'id_perfil');
