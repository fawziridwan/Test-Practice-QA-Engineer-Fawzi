const assert = require('chai').expect;

// services object
const tokenRequest = require('../pageobjects/TokenService');

// data testing(payload)
const tokenData = require('../data/token_credential.json');

const testcases_authorization = {
    "authorization_tc01": "authorization true with valid token",
    "authorization_tc02": "authorization false with invalid token"
}

describe('Authorization Request Testcases', () => {
    let validToken;

    before(async () => {
        // generate token first
        const tokenResponse = await tokenRequest.generateToken(tokenData.valid_user_token);
        validToken = tokenResponse.body.token;
    });

    it(`${testcases_authorization.authorization_tc01}`, async () => {
        // authorization with valid token
        const authResponse = await tokenRequest.authorization(validToken, tokenData.valid_user_token);
        console.log("valid token response:", authResponse);
        assert(authResponse.statusCode).to.equal(200);
        assert(authResponse.body.success).to.equal(true);
        assert(authResponse.body.Authorize).to.equal(true);
    });

    it(`${testcases_authorization.authorization_tc02}`, async () => {
        // authorization with invalid token
        const authResponse = await tokenRequest.authorization(tokenData.invalid_credential);
        console.log("invalid token response:", authResponse);
        assert(authResponse.statusCode).to.equal(400);
        assert(authResponse.body.success).to.equal(false);
        assert(authResponse.body.Authorize).to.equal(false);
    });
});