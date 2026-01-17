const { Usuario, UsuarioPerfil, Perfil } = require('../models');
const crypto = require('crypto');

function md5(text){
	return crypto.createHash('md5').update(String(text)).digest('hex');
}

module.exports = {
	list: async (req, res) => {
		try {
			const items = await Usuario.findAll();
			const sanitized = []
			for(const i of items){
				const o = i.toJSON(); delete o.senha_hash
				// fetch perfis ids for this usuario
				try{
					const ups = await UsuarioPerfil.findAll({ where: { id_usuario: o.id_usuario } })
					o._perfis = ups.map(x=> x.id_perfil)
				}catch(e){ o._perfis = [] }
				sanitized.push(o)
			}
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
			const o = item.toJSON(); delete o.senha_hash
			// include perfis with names
			try{
				const ups = await UsuarioPerfil.findAll({ where: { id_usuario: o.id_usuario } })
				const perfilIds = ups.map(x=> x.id_perfil)
				if(perfilIds.length){
					const perfis = await Perfil.findAll({ where: { id_perfil: perfilIds } })
					o._perfis = perfis.map(p=> ({ id_perfil: p.id_perfil, nome: p.nome }))
				} else o._perfis = []
			}catch(e){ o._perfis = [] }
			res.json(o);
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
			const perfis = Array.isArray(body.perfis)? body.perfis.slice() : null
			if(perfis) delete body.perfis
			const created = await Usuario.create(body);
			// assign perfis if provided
			if(perfis && created && created.id_usuario){
				for(const pid of perfis){
					try{ await UsuarioPerfil.create({ id_usuario: created.id_usuario, id_perfil: pid }) }catch(e){}
				}
			}
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
			const perfis = Array.isArray(body.perfis)? body.perfis.slice() : null
			if(perfis) delete body.perfis
			await item.update(body);
			// update perfis: remove existing and insert new
			if(perfis){
				try{ await UsuarioPerfil.destroy({ where: { id_usuario: item.id_usuario } }) }catch(e){}
				for(const pid of perfis){ try{ await UsuarioPerfil.create({ id_usuario: item.id_usuario, id_perfil: pid }) }catch(e){} }
			}
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
