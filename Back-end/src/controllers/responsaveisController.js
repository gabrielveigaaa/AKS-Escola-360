const { Responsavel, Aluno, Usuario } = require('../models');

module.exports = {
  // list all relations or filter by aluno query param
  list: async (req, res) => {
    try {
      const where = {};
      if (req.query.alunoId) where.tb_alunos_id_aluno = req.query.alunoId;
      if (req.query.usuarioId) where.tb_usuarios_id_usuario = req.query.usuarioId;
      const items = await Responsavel.findAll({ where });
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const { tb_alunos_id_aluno, tb_usuarios_id_usuario, cpf } = req.body;
      if (!tb_alunos_id_aluno || !tb_usuarios_id_usuario) return res.status(400).json({ error: 'Missing keys' });
      const aluno = await Aluno.findByPk(tb_alunos_id_aluno);
      const usuario = await Usuario.findByPk(tb_usuarios_id_usuario);
      if (!aluno || !usuario) return res.status(400).json({ error: 'Aluno or Usuario not found' });
      const created = await Responsavel.create({ tb_alunos_id_aluno, tb_usuarios_id_usuario, cpf: cpf || null });
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  remove: async (req, res) => {
    try {
      const { alunoId, usuarioId } = req.params;
      const item = await Responsavel.findOne({ where: { tb_alunos_id_aluno: alunoId, tb_usuarios_id_usuario: usuarioId } });
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
