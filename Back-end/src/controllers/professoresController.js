const { Professor } = require('../models');
const createCrud = require('./crudController');

module.exports = createCrud(Professor, 'id_professor');
