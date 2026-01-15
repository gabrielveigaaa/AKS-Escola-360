module.exports = (sequelize, DataTypes) => {
  const Nota = sequelize.define('Nota', {
    id_nota: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_avaliacao: { type: DataTypes.INTEGER, allowNull: false },
    id_matricula: { type: DataTypes.INTEGER, allowNull: false },
    nota: { type: DataTypes.DECIMAL(4,2), allowNull: false }
  }, {
    tableName: 'tb_notas',
    timestamps: false,
    indexes: [{ unique: true, fields: ['id_avaliacao', 'id_matricula'] }]
  });
  return Nota;
};
