// services/BookstoreService.js
const supertest = require('supertest');
require('dotenv').config();

const api = supertest(process.env.BASE_URL)

const token = '';

const BookstoreService = (payload) => api.post('/BookStore/v1/Books')
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('Authorization', `Bearer ${token}`)
  .send(payload)

  const DeleteBookstore = (UserId) => api.delete(`/BookStore/v1/Books?UserId=`+UserId)
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('Authorization', `Bearer ${token}`)  

  const GetBookstore = () => api.get('/BookStore/v1/Books')
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')

const GetBookstoreByISBN = (ISBN) => api.get(`/BookStore/v1/Book?ISBN=` + ISBN)
  .set('accept', 'application/json')
  .set('Content-Type', 'application/json')

module.exports = { BookstoreService , GetBookstore, GetBookstoreByISBN, DeleteBookstore }