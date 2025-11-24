// services/TokenService.js
const { send } = require('process');
const supertest = require('supertest');
require('dotenv').config();

const api = supertest(process.env.BASE_URL)

const generateToken = (payload) => api.post('/Account/v1/GenerateToken')
	.set('Content-Type', 'application/json')
	.set('Accept', 'application/json')
	.send(payload)

const authorization = async (token, payload) => {
    try {
        const response = await api.post('/Account/v1/Authorized')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(payload);

        if (response.statusCode === 200 && response.body === true) {
            return {
                statusCode: 200,
                body: {
                    "success": true,
                    "statusCode": 200,
                    "message": "Authorized Successfull",
                    "Authorize": true
                }
            };
        } else {
            const message = (response.body && response.body.message) ? response.body.message : 'Authorization Failed';
            return {
                statusCode: response.statusCode,
                body: {
                    "success": false,
                    "statusCode": response.statusCode,
                    "message": message,
                    "Authorize": false
                }
            };
        }
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        const message = error.message || 'An unexpected error occurred';
        return {
            statusCode: statusCode,
            body: {
                "success": false,
                "statusCode": statusCode,
                "message": message,
                "Authorize": false
            }
        };
    }
}

module.exports = { 
	generateToken,authorization
};