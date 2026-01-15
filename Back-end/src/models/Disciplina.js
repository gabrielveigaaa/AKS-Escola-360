module.exports = (sequelize, DataTypes) => {
  const Disciplina = sequelize.define('Disciplina', {
    id_disciplina: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    carga_horaria: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'tb_disciplinas',
    timestamps: false
  });
  return Disciplina;
};
