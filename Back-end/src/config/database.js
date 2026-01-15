const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  username: process.env.DB_USER || 'developer',
  password: process.env.DB_PASS || 'developer',
  database: process.env.DB_NAME || 'sistema_aks',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true
  }
};
