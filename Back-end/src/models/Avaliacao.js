module.exports = (sequelize, DataTypes) => {
  const Avaliacao = sequelize.define('Avaliacao', {
    id_avaliacao: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_turma_disciplina: { type: DataTypes.INTEGER, allowNull: false },
    descricao: { type: DataTypes.STRING(150) },
    data_avaliacao: { type: DataTypes.DATEONLY, allowNull: false },
    peso: { type: DataTypes.DECIMAL(4,2), defaultValue: 1.00 }
  }, {
    tableName: 'tb_avaliacoes',
    timestamps: false
  });
  return Avaliacao;
};
