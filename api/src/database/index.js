const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

let config;

if(process.env.NODE_ENV !== 'development') {
	config = {
		connectionString: process.env.DB_CONNECTION_STRING
	};

} else {
	config = {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME
	};
}


const client = new Client(config);
client.connect();

exports.query = async (query, values) => {
	const { rows } = await client.query(query, values);
	return rows;
};
