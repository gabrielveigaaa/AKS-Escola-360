module.exports = (sequelize, DataTypes) => {
  const Endereco = sequelize.define('Endereco', {
    id_endereco: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    cep: { type: DataTypes.STRING(9), allowNull: true },
    logradouro: { type: DataTypes.STRING(100), allowNull: true },
    complemento: { type: DataTypes.STRING(45), allowNull: true },
    numero: { type: DataTypes.STRING(45), allowNull: true },
    bairro: { type: DataTypes.STRING(45), allowNull: true },
    uf: { type: DataTypes.STRING(45), allowNull: true },
    cidade: { type: DataTypes.STRING(45), allowNull: true },
    tb_usuarios_id_usuario: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'tb_endereco',
    timestamps: false
  });
  return Endereco;
};
