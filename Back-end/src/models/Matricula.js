module.exports = (sequelize, DataTypes) => {
  const Matricula = sequelize.define('Matricula', {
    id_matricula: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_aluno: { type: DataTypes.INTEGER, allowNull: false },
    id_turma: { type: DataTypes.INTEGER, allowNull: false },
    data_matricula: { type: DataTypes.DATEONLY, allowNull: false }
  }, {
    tableName: 'tb_matriculas',
    timestamps: false,
    indexes: [{ unique: true, fields: ['id_aluno', 'id_turma'] }]
  });
  return Matricula;
};
