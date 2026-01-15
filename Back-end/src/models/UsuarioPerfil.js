module.exports = (sequelize, DataTypes) => {
  const UsuarioPerfil = sequelize.define('UsuarioPerfil', {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true },
    id_perfil: { type: DataTypes.INTEGER, primaryKey: true }
  }, {
    tableName: 'tb_usuario_perfis',
    timestamps: false
  });
  return UsuarioPerfil;
};
