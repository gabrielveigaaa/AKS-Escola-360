const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const db = require('./src/models');

app.get('/', (req, res) => res.send('Escola360 API'));

app.use('/api', require('./src/routes'));

async function start() {
	try {
		await db.sequelize.authenticate();
		console.log('Database connected');
		// Do not auto-sync production schema by default. Uncomment if you want sync.
		// await db.sequelize.sync({ alter: false });
		app.listen(port, () => console.log(`Server running on port ${port}`));
	} catch (err) {
		console.error('Unable to connect to database:', err);
		process.exit(1);
	}
}

start();

