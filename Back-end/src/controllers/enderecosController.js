const { Endereco, Usuario } = require('../models');

module.exports = {
  list: async (req, res) => {
    try {
      const items = await Endereco.findAll();
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const item = await Endereco.findByPk(id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  create: async (req, res) => {
    try {
      const body = { ...req.body };
      // validate user
      const user = await Usuario.findByPk(body.tb_usuarios_id_usuario);
      if (!user) return res.status(400).json({ error: 'Usuario not found' });
      const created = await Endereco.create(body);
      res.status(201).json(created);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const item = await Endereco.findByPk(id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  remove: async (req, res) => {
    try {
      const id = req.params.id;
      const item = await Endereco.findByPk(id);
      if (!item) return res.status(404).json({ error: 'Not found' });
      await item.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
