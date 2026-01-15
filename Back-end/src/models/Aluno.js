module.exports = (sequelize, DataTypes) => {
  const Aluno = sequelize.define('Aluno', {
    id_aluno: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    cpf: { type: DataTypes.CHAR(11), allowNull: false, unique: true },
    data_nascimento: { type: DataTypes.DATEONLY }
  }, {
    tableName: 'tb_alunos',
    timestamps: false
  });
  return Aluno;
};
