// services/TokenService.js
const supertest = require('supertest');
require('dotenv').config();

const api = supertest(process.env.BASE_URL)

const generateToken = (payload) => api.post('/Account/v1/GenerateToken')
	.set('Content-Type', 'application/json')
	.set('Accept', 'application/json')
	.send(payload)

module.exports = {
	generateToken
};