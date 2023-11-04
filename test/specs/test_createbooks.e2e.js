const assert = require('chai').expect;

// services object
const tokenRequest = require('../pageobjects/TokenService');
const booksRequest = require('../pageobjects/BookstoreService');

// data testing(payload)
const tokenData = require('../data/token_credential.json');
const booksData = require('../data/books_data.json');

const testcases_token = {
    "tokenservices_tc01": "generate valid token",
    "tokenservices_tc02": "generate invalid credential",
    "tokenservices_tc03": "generate incorrect username",
    "tokenservices_tc04": "generate incorrect password",
    "tokenservices_tc05": "username require",
    "tokenservices_tc06": "password require",
    "tokenservices_tc07": "all field required",
}

const testcases_bookstore = {
    "bookstore_tc01": "create books",
    "bookstore_tc02": "create books - isbn already exist",
    "bookstore_tc03": "create books - token unauthorize",
    "bookstore_tc04": "delete books",
}

describe('Book Services Testcase', () => {
    it(`${testcases_token.tokenservices_tc02}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.invalid_credential)
        assert(response.body.token).equal(null);
        assert(response.body.expires).equal(null);
        assert(response.body.status).equal('Failed');
        assert(response.body.result).equal('User authorization failed.');
    });
    it(`${testcases_token.tokenservices_tc03}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.incorrect_username)
        assert(response.statusCode).equal(200);
        assert(response.body.token).equal(null);
        assert(response.body.expires).equal(null);
        assert(response.body.status).equal('Failed');
        assert(response.body.result).equal('User authorization failed.');
    });
    it(`${testcases_token.tokenservices_tc04}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.incorrect_password)
        assert(response.statusCode).equal(200);
        assert(response.body.token).equal(null);
        assert(response.body.expires).equal(null);
        assert(response.body.status).equal('Failed');
        assert(response.body.result).equal('User authorization failed.');
    });
    it(`${testcases_token.tokenservices_tc05}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.username_require)
        assert(response.statusCode).equal(400);
        assert(response.body.code).equal('1200');
        assert(response.body.message).equal('UserName and Password required.');
    });
    it(`${testcases_token.tokenservices_tc06}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.password_require)
        assert(response.statusCode).equal(400);
        assert(response.body.code).equal('1200');
        assert(response.body.message).equal('UserName and Password required.');

    });
    it(`${testcases_token.tokenservices_tc07}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.all_field_required)
        assert(response.statusCode).equal(400);
        assert(response.body.code).equal('1200');
        assert(response.body.message).equal('UserName and Password required.');
    });
    it(`${testcases_token.tokenservices_tc01}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.valid_user_token)
            .then(function (res) {
                console.log("response is: ", res.body, res.statusCode)
                token = res.body.token
                assert(res.statusCode).equal(200);
                assert(res.body.token).equal(res.body.token);
                assert(res.body.expires).equal(res.body.expires);
                assert(res.body.status).equal(res.body.status);
                assert(res.body.result).equal(res.body.result);
            })
    });
    it(`${testcases_bookstore.bookstore_tc01}`, async () => {
        
        const response = await tokenRequest.generateToken(tokenData.valid_user_token)
            .then(function (res) {
                token = res.body.token
                assert(res.statusCode).equal(200);
            })

            const deleteResponse = await booksRequest.DeleteBookstore(booksData.data_user.userId)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(function (res, err) {
                console.log("Delete Success: ", res.statusCode)
            });            

        const booksResponse = await booksRequest.BookstoreService()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(booksData.valid_books)
            .then(function (res, err) {
                console.log("response is: ", res.body, res.statusCode)
                assert(res.statusCode).equal(201);
                assert(res.statusCode).equal(201);
                assert(res.body.books.isbn).equal(res.body.books.isbn);
                assert(res.body.books[0]).equal(res.body.books[0]);
            });
    });
    it(`${testcases_bookstore.bookstore_tc02}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.valid_user_token)
            .then(function (res) {
                token = res.body.token
            })

        const booksResponse = await booksRequest.BookstoreService()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(booksData.isbn_already_exist)
            .then(function (res, err) {
                console.log("response is: ", res.body, res.statusCode)
                assert(res.statusCode).equal(400);
                assert(res.body.code).equal("1210");
                assert(res.body.message).equal("ISBN already present in the User's Collection!");
            });
    });
    it(`${testcases_bookstore.bookstore_tc04}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.valid_user_token)
            .then(function (res) {
                token = res.body.token
            })

        const deleteResponse = await booksRequest.DeleteBookstore(booksData.data_user.userId)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(function (res, err) {
                console.log("response is: ", res.body, res.statusCode)
                assert(res.statusCode).equal(204);
            });
    });
    it(`${testcases_bookstore.bookstore_tc03}`, async () => {
        const response = await tokenRequest.generateToken(tokenData.valid_user_token)
            .then(function (res) {
                token = res.body.token
            })

        const booksResponse = await booksRequest.BookstoreService()
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer null`)
            .send(booksData.token_unauthorize)
            .then(function (res, err) {
                console.log("response is: ", res.body, res.statusCode)
                assert(res.statusCode).equal(401);
                assert(res.body.code).equal("1200");
                assert(res.body.message).equal("User not authorized!");
            });
    });
});