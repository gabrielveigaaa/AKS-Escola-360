const { Usuario } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Usuario, 'id_usuario');
