module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    id_aluno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    data_nascimento: { type: DataTypes.DATEONLY, allowNull: true },
    nome_mae: { type: DataTypes.STRING(100), allowNull: true },
    nome_pai: { type: DataTypes.STRING(100), allowNull: true },
    sexo: { type: DataTypes.STRING(45), allowNull: true }
  }, {
    tableName: 'tb_alunos',
    timestamps: false
  });
  return Aluno;
};
