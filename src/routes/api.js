const express = require('express')
const Route = express.Router() //merupakan salah satu fungsi pada exspres.js

const BookController = require('../controllers/books')
const GenreController = require('../controllers/genres')
const RentController = require('../controllers/books')
const ReturnController = require('../controllers/books')
const SearchController= require('../controllers/books')
const SortController= require('../controllers/books')
const AvailController= require('../controllers/books')
const UserController= require('../controllers/users')

Route
    //USER REGISTER AND LOGIN
    .post('/regist',UserController.Regist)
    .post('/login',UserController.Login)
    .post('/verif',UserController.Verify)

    //CRUD BOOK
    .post('/add', BookController.insertData)   //untuk menambahkan data
    .get('/book',BookController.combination)
    .patch('/update', BookController.updateBook)
    .delete('/delete',BookController.deleteBook)
    //CRUD GENRE
    .post('/genreinsert',GenreController.insertData) 
    .get('/genre',GenreController.getAll)
    .patch('/genreupdate',GenreController.updateGenre)
    .delete('/genredelete',GenreController.deleteGenre)
    //SORTTING
    .get('/sortbytitle', SortController.sortbytitle)
    .get('/sortbyrelease', SortController.sortbyrelease)
    .get('/sortbygenre',SortController.sortbygenre)
    .get('/availability', AvailController.availability)
    //TRANSACTION
    .post('/rent',RentController.insertRent)
    .patch('/return', ReturnController.returnBook)
    //SEARCH
    .get('/search', SearchController.search)
    
    
module.exports = Route