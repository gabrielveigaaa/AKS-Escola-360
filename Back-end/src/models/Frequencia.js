module.exports = (sequelize, DataTypes) => {
  const Frequencia = sequelize.define('Frequencia', {
    id_frequencia: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_matricula: { type: DataTypes.INTEGER, allowNull: false },
    id_turma_disciplina: { type: DataTypes.INTEGER, allowNull: false },
    data: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.ENUM('PRESENTE','FALTA','JUSTIFICADO'), allowNull: false }
  }, {
    tableName: 'tb_frequencias',
    timestamps: false,
    indexes: [{ unique: true, fields: ['id_matricula', 'id_turma_disciplina', 'data'] }]
  });
  return Frequencia;
};
