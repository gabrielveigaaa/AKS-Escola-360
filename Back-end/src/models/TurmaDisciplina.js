module.exports = (sequelize, DataTypes) => {
  const TurmaDisciplina = sequelize.define('TurmaDisciplina', {
    id_turma_disciplina: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_turma: { type: DataTypes.INTEGER, allowNull: false },
    id_disciplina: { type: DataTypes.INTEGER, allowNull: false },
    id_professor: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'tb_turma_disciplinas',
    timestamps: false,
    indexes: [{ unique: true, fields: ['id_turma', 'id_disciplina'] }]
  });
  return TurmaDisciplina;
};
