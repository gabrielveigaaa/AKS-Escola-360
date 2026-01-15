module.exports = (sequelize, DataTypes) => {
  const Turma = sequelize.define('Turma', {
    id_turma: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    ano_letivo: { type: DataTypes.INTEGER, allowNull: false },
    turno: { type: DataTypes.ENUM('MANHA', 'TARDE', 'NOITE'), allowNull: false },
    ativa: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, {
    tableName: 'tb_turmas',
    timestamps: false
  });
  return Turma;
};
