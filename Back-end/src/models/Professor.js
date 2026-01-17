module.exports = (sequelize, DataTypes) => {
  const Professor = sequelize.define('Professor', {
    id_professor: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_usuario: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    data_admissao: { type: DataTypes.DATEONLY }
  }, {
    tableName: 'tb_professores',
    timestamps: false
  });
  return Professor;
};
