module.exports = (sequelize, DataTypes) => {
  const Responsavel = sequelize.define('Responsavel', {
    tb_alunos_id_aluno: { type: DataTypes.INTEGER, primaryKey: true },
    tb_usuarios_id_usuario: { type: DataTypes.INTEGER, primaryKey: true },
    cpf: { type: DataTypes.STRING(11), allowNull: true }
  }, {
    tableName: 'tb_responsaveis',
    timestamps: false
  });
  return Responsavel;
};
