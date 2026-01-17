const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const files = fs.readdirSync(__dirname).filter(f => f !== 'index.js' && f.endsWith('.js'));
for (const file of files) {
  const model = require(path.join(__dirname, file))(sequelize, DataTypes);
  db[model.name] = model;
}

// Associations
const {
  Usuario,
  Perfil,
  UsuarioPerfil,
  Professor,
  Aluno,
  Turma,
  Disciplina,
  TurmaDisciplina,
  Matricula,
  Avaliacao,
  Nota,
  Frequencia,
  Endereco,
  Responsavel
} = db;

if (Usuario && Perfil && UsuarioPerfil) {
  Usuario.belongsToMany(Perfil, { through: UsuarioPerfil, foreignKey: 'id_usuario', otherKey: 'id_perfil' });
  Perfil.belongsToMany(Usuario, { through: UsuarioPerfil, foreignKey: 'id_perfil', otherKey: 'id_usuario' });
}

if (Usuario && Professor) {
  Professor.belongsTo(Usuario, { foreignKey: 'id_usuario' });
  Usuario.hasOne(Professor, { foreignKey: 'id_usuario' });
}

if (Usuario && Aluno) {
  Aluno.belongsTo(Usuario, { foreignKey: 'id_usuario' });
  Usuario.hasOne(Aluno, { foreignKey: 'id_usuario' });
}

if (Turma && TurmaDisciplina) {
  Turma.hasMany(TurmaDisciplina, { foreignKey: 'id_turma' });
  TurmaDisciplina.belongsTo(Turma, { foreignKey: 'id_turma' });
}

if (Disciplina && TurmaDisciplina) {
  Disciplina.hasMany(TurmaDisciplina, { foreignKey: 'id_disciplina' });
  TurmaDisciplina.belongsTo(Disciplina, { foreignKey: 'id_disciplina' });
}

if (Professor && TurmaDisciplina) {
  Professor.hasMany(TurmaDisciplina, { foreignKey: 'id_professor' });
  TurmaDisciplina.belongsTo(Professor, { foreignKey: 'id_professor' });
}

if (Aluno && Matricula) {
  Aluno.hasMany(Matricula, { foreignKey: 'id_aluno' });
  Matricula.belongsTo(Aluno, { foreignKey: 'id_aluno' });
}

if (Turma && Matricula) {
  Turma.hasMany(Matricula, { foreignKey: 'id_turma' });
  Matricula.belongsTo(Turma, { foreignKey: 'id_turma' });
}

if (TurmaDisciplina && Avaliacao) {
  TurmaDisciplina.hasMany(Avaliacao, { foreignKey: 'id_turma_disciplina' });
  Avaliacao.belongsTo(TurmaDisciplina, { foreignKey: 'id_turma_disciplina' });
}

if (Avaliacao && Nota) {
  Avaliacao.hasMany(Nota, { foreignKey: 'id_avaliacao' });
  Nota.belongsTo(Avaliacao, { foreignKey: 'id_avaliacao' });
}

if (Matricula && Nota) {
  Matricula.hasMany(Nota, { foreignKey: 'id_matricula' });
  Nota.belongsTo(Matricula, { foreignKey: 'id_matricula' });
}

if (Matricula && Frequencia) {
  Matricula.hasMany(Frequencia, { foreignKey: 'id_matricula' });
  Frequencia.belongsTo(Matricula, { foreignKey: 'id_matricula' });
}

if (TurmaDisciplina && Frequencia) {
  TurmaDisciplina.hasMany(Frequencia, { foreignKey: 'id_turma_disciplina' });
  Frequencia.belongsTo(TurmaDisciplina, { foreignKey: 'id_turma_disciplina' });
}

if (Usuario && Endereco) {
  Usuario.hasMany(Endereco, { foreignKey: 'tb_usuarios_id_usuario' });
  Endereco.belongsTo(Usuario, { foreignKey: 'tb_usuarios_id_usuario' });
}

if (Aluno && Usuario && Responsavel) {
  Aluno.belongsToMany(Usuario, { through: Responsavel, foreignKey: 'tb_alunos_id_aluno', otherKey: 'tb_usuarios_id_usuario' });
  Usuario.belongsToMany(Aluno, { through: Responsavel, foreignKey: 'tb_usuarios_id_usuario', otherKey: 'tb_alunos_id_aluno' });
}

module.exports = db;
