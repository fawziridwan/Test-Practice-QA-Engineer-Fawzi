const assert = require('chai').expect;
const { expect } = require('chai');

const tokenData = require('../data/token_credential.json');
const booksData = require('../data/books_data.json');
const booksRequest = require('../pageobjects/BookstoreService');

const testcases_getbooks = {
    getbooks_tc01: "get books - fetch all books",
    getbooks_tc02: "get books - fetch books by isbn",
    getbooks_tc03: "get books - should return valid books array",
}

describe('Get Books Testcase', () => {

    it(`${testcases_getbooks.getbooks_tc01}`, async () => {
        // get books
        const response = await booksRequest.GetBookstore();
        assert(response.statusCode).equal(200);
        assert(response.body.books).to.be.an('array');
    });

    it(`${testcases_getbooks.getbooks_tc02}`, async () => {
        // get books
        const ISBN = booksData.valid_books.collectionOfIsbns[0].isbn;
        const response = await booksRequest.GetBookstoreByISBN(ISBN);
        assert(response.statusCode).equal(200);
        assert(response.body.isbn).equal(ISBN);
        assert(response.body.title).equal('Learning JavaScript Design Patterns');
        assert(response.body.author).equal('Addy Osmani');
        assert(response.body.publisher).equal("O'Reilly Media");
        assert(response.body.pages).equal(254);
        assert(response.body.description).equal(`With Learning JavaScript Design Patterns, you'll learn how to write beautiful, structured, and maintainable JavaScript by applying classical and modern design patterns to the language. If you want to keep your code efficient, more manageable, and up-to-da`);
        assert(response.body.website).equal(response.body.website);
        assert(response.body.publish_date).equal(response.body.publish_date);
    });

    it(`${testcases_getbooks.getbooks_tc03}`, async () => {
        const response = await booksRequest.GetBookstore();

        // Destructure the response body
        const { body } = response;
        const { books } = body;

        // Structure validation
        expect(body).to.be.an('object');
        expect(body).to.have.property('books');
        expect(books).to.be.an('array').with.length(8);

        // Validate each book
        books.forEach(book => {
            // Required fields
            expect(book).to.have.all.keys([
                'isbn', 'title', 'subTitle', 'author', 'publish_date',
                'publisher', 'pages', 'description', 'website'
            ]);

            // Data types
            expect(book.isbn).to.be.a('string').and.to.match(/^\d{13}$/);
            expect(book.title).to.be.a('string').and.to.not.be.empty;
            expect(book.subTitle).to.be.a('string').and.to.not.be.empty;
            expect(book.author).to.be.a('string').and.to.not.be.empty;
            expect(book.publish_date).to.be.a('string').and.to.not.be.empty;
            expect(book.publisher).to.be.a('string').and.to.not.be.empty;
            expect(book.pages).to.be.a('number').and.to.be.above(0);
            expect(book.description).to.be.a('string').and.to.not.be.empty;
            expect(book.website).to.be.a('string').and.to.match(/^https?:\/\/.+/);
        });

        // Specific book validation
        const gitBook = books.find(book => book.isbn === '9781449325862');
        expect(gitBook).to.exist;
        expect(gitBook).to.include({
            title: 'Git Pocket Guide',
            author: 'Richard E. Silverman'
        });
    });
});