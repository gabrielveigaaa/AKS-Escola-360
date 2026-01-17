const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');

app.use(express.json());
app.use(cors());

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
		// Do not auto-sync production schema by default. Uncomment if you want sync.
		// await db.sequelize.sync({ alter: false });
		app.listen(port, () => console.log(`Server running on port ${port}`));
	} catch (err) {
		console.error('Unable to connect to database:', err);
		process.exit(1);
	}
}

start();

