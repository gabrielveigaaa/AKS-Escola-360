module.exports = (sequelize, DataTypes) => {
  const Perfil = sequelize.define('Perfil', {
    id_perfil: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING(50), allowNull: false, unique: true }
  }, {
    tableName: 'tb_perfis',
    timestamps: false
  });
  return Perfil;
};
