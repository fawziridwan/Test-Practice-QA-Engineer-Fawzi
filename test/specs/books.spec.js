import BookService from '../services/bookServices';

let isbn = '9781449325862';
let requestUser = {
    "userName": "fawzi1",
    "password": "P@Ssw0rd2"
}
let requestBooks = {
    "userId": "792347b6-8745-4038-b68e-8715b34760da",
    "collectionOfIsbns": [
        {
            "isbn": `${isbn}`
        }
    ]
}
let userId = '792347b6-8745-4038-b68e-8715b34760da'

describe('Books Test Suite', () => {
    it('Generate Token', () => {
        let response;
        browser.call(() => {
            return BookService.generateToken(requestUser)
                .then(data => response = data)
                .catch(err => console.log(err))
        })
        token = response.token;
        status = response.status;
        result = response.result;
        console.log(response.token)
        expect(response.status).to.eql('Success');
        expect(response.result).to.eql('User authorized successfully');
    });
    it('POST create Books - ISBN already present in the Users Collection!', () => {
        let response;
        browser.call(() => {
            return BookService.createBooks(requestBooks)
                .then(data => response = data)
                .catch(err => console.log(err))
        })
        console.log(response)
        expect(response.status).toEqual(201);
        expect(response.books[0].isbn).toEqual(isbn)
    });
    it('Delete Books', () => {
        let response;
        browser.call(() => {
            return BookService.deleteBooks(userId)
                .then(data => response = data)
                .catch(err => console.log(err))
        })
        expect(response.status).toEqual(204);
    })
});
