const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
const crypto = require('crypto');

app.use(express.json());
app.use(cors());

// Normalize request body strings to uppercase (except password fields)
app.use((req, res, next) => {
	try{
		function up(obj){
			if(!obj || typeof obj !== 'object') return
			Object.keys(obj).forEach(k=>{
				try{
					const v = obj[k]
					if(typeof v === 'string'){
						if(k === 'senha' || k === 'senha_hash' || k === 'email') return
						obj[k] = v.toUpperCase()
					} else if(typeof v === 'object') up(v)
				}catch(e){}
			})
		}
		up(req.body)
	}catch(e){}
	next()
})

// Request/response logger middleware for debugging
app.use((req, res, next) => {
	const start = Date.now()
	try {
		console.log(`[API] --> ${req.method} ${req.originalUrl} ${JSON.stringify(req.body || {})}`)
	} catch (e) {
		console.log(`[API] --> ${req.method} ${req.originalUrl}`)
	}

	const oldSend = res.send
	let responseBody
	res.send = function (body) {
		responseBody = body
		return oldSend.call(this, body)
	}

	res.on('finish', () => {
		const dur = Date.now() - start
		let respText = ''
		try {
			if (responseBody) {
				if (typeof responseBody === 'object') respText = JSON.stringify(responseBody)
				else respText = String(responseBody)
			}
		} catch (e) { respText = '[unserializable]' }
		console.log(`[API] <-- ${req.method} ${req.originalUrl} ${res.statusCode} ${dur}ms ${respText}`)
	})

	next()
})

const db = require('./src/models');

app.get('/', (req, res) => res.send('Escola360 API'));

app.use('/api', require('./src/routes'));

async function start() {
	try {
		await db.sequelize.authenticate();
		console.log('Database connected');

		// Ensure required perfis exist
		try{
			const required = ['ADMIN','ALUNO','PROFESSOR','RESPONSAVEL','USUARIO']
			if(db.Perfil){
				for(const nome of required){
					try{ await db.Perfil.findOrCreate({ where: { nome } }) }catch(e){ console.error('ensure perfil', nome, e) }
				}
			}
		}catch(e){ console.error('error ensuring perfis', e) }

		// Ensure default responsible user exists (seed)
		try{
			if(db.Usuario){
				function md5(text){ return crypto.createHash('md5').update(String(text)).digest('hex') }
				const defaultData = {
					 nome: 'Grupo AKS Educacional',
					 email: 'secretaria@grupoaks.com.br',
					 cpf: '12345678910',
					 rg: '1122334455667788-99',
					 senha_hash: md5('012345678910'),
					 ativo: true
				}
				const [user, created] = await db.Usuario.findOrCreate({ where: { email: defaultData.email }, defaults: defaultData })
				console.log('Default responsavel user:', user.id_usuario, 'created:', created)
				// attach perfil RESPONSAVEL if exists
				try{
					const perfil = await db.Perfil.findOne({ where: { nome: 'RESPONSAVEL' } })
					if(perfil){
						const up = await db.UsuarioPerfil.findOne({ where: { id_usuario: user.id_usuario, id_perfil: perfil.id_perfil } })
						if(!up) await db.UsuarioPerfil.create({ id_usuario: user.id_usuario, id_perfil: perfil.id_perfil })
					}
				}catch(e){ console.error('attach perfil to default user', e) }
				// ensure endereco exists for this user
				try{
					if(db.Endereco){
						const exists = await db.Endereco.findOne({ where: { tb_usuarios_id_usuario: user.id_usuario } })
						if(!exists){
							await db.Endereco.create({ tb_usuarios_id_usuario: user.id_usuario, cep: '53441300', logradouro: 'Rua Oitenta e Quatro', complemento: 'BLOCO 2', numero: '110', bairro: 'Maranguape I', uf: 'PE', cidade: 'Paulista' })
						}
					}
				}catch(e){ console.error('ensure endereco for default user', e) }
			}
		}catch(e){ console.error('error ensuring default responsavel user', e) }
		// Do not auto-sync production schema by default. Uncomment if you want sync.
		// await db.sequelize.sync({ alter: false });
		app.listen(port, () => console.log(`Server running on port ${port}`));
	} catch (err) {
		console.error('Unable to connect to database:', err);
		process.exit(1);
	}
}

start();

