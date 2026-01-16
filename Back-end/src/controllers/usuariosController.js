const { Usuario } = require('../models');
const crypto = require('crypto');

function md5(text){
	return crypto.createHash('md5').update(String(text)).digest('hex');
}

module.exports = {
	list: async (req, res) => {
		try {
			const items = await Usuario.findAll();
			const sanitized = items.map(i => { const o = i.toJSON(); delete o.senha_hash; return o });
			res.json(sanitized);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	get: async (req, res) => {
		try {
			const id = req.params.id;
			const item = await Usuario.findByPk(id);
			if (!item) return res.status(404).json({ error: 'Not found' });
			const o = item.toJSON(); delete o.senha_hash; res.json(o);
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	create: async (req, res) => {
		try {
			const body = { ...req.body };
			if (body.senha) {
				body.senha_hash = md5(body.senha);
				delete body.senha;
			}
			const created = await Usuario.create(body);
			const o = created.toJSON(); delete o.senha_hash;
			res.status(201).json(o);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},
	update: async (req, res) => {
		try {
			const id = req.params.id;
			const item = await Usuario.findByPk(id);
			if (!item) return res.status(404).json({ error: 'Not found' });
			const body = { ...req.body };
			if (body.senha) { body.senha_hash = md5(body.senha); delete body.senha }
			await item.update(body);
			const o = item.toJSON(); delete o.senha_hash; res.json(o);
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},
	remove: async (req, res) => {
		try {
			const id = req.params.id;
			const item = await Usuario.findByPk(id);
			if (!item) return res.status(404).json({ error: 'Not found' });
			await item.destroy();
			res.status(204).send();
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	}
};
