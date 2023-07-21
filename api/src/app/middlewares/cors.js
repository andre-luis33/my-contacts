const allowedOrigins = [
	'http://localhost:3000',
	'https://my-contacts-sepia-one.vercel.app',
	'https://my-website-andre-luis33.vercel.app/',
	'https://my-website-andre-luis33.vercel.app/english'
];


/** @type {import("express").RequestHandler} */
module.exports = (request, response, next) => {
	const { origin } = request.headers;

	response.setHeader('Access-Control-Allow-Origin', allowedOrigins.includes(origin) ? origin : '');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.setHeader('Access-Control-Allow-Headers', '*');
	response.setHeader('Access-Control-Max-Age', '10');
	next();
};
