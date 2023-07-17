export default function getApiUrl() {
	return process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api-mycontacts.onrender.com';
}
