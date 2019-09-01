const express = require('express')
const Route = express.Router() 

const BookController = require('../controllers/books')
const GenreController = require('../controllers/genres')
const RentController = require('../controllers/books')
const ReturnController = require('../controllers/books')
const SearchController= require('../controllers/books')
const SortingController= require('../controllers/books')
const AvailabilityController= require('../controllers/books')
const UserController= require('../controllers/users')
const HistoryController=require('../controllers/books')
Route
    //USER REGISTER AND LOGIN
    .post('/user',UserController.Regist)
    .post('/login',UserController.Login)
    .patch('/user',UserController.Verify)

    //CRUD BOOK 
    .get('/book',BookController.getAll)
    .post('/book', BookController.insertData)       
    .patch('/book', BookController.updateBook)
    .delete('/book',BookController.deleteBook)
    //COMBINATION
    .get('/bookcombin',BookController.combination)  
    //CRUD GENRE
    .post('/genre',GenreController.insertData) 
    .get('/genre',GenreController.getAll)           
    .put('/genre',GenreController.updateGenre)
    .delete('/genre',GenreController.deleteGenre)
    //SORTTING
    .get('/sort', SortingController.sortBook) 
    .get('/availability',AvailabilityController.availability) 
    //TRANSACTION
    .post('/rent',RentController.insertRent)
    .patch('/return', ReturnController.returnBook)
    .get('/history', HistoryController.history)
    //SEARCH
    .get('/search', SearchController.search) 
    
    
module.exports = Route