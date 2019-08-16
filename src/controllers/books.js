const modelBooks = require('../models/books')

module.exports = {
    getAll: (req, res) => {
        var page= parseInt(req.query.page,10)
        var limit= parseInt(req.query.limit,10)
        if(isNaN(page)|| page<1)
            page=1
        if(isNaN(limit))
            limit=10
        else if(limit>20)
            limit=20
        else if(limit<1)
            limit=10 
        modelBooks.getData(page,limit)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    combination: (req, res) =>{
        var page= parseInt(req.query.page) || 1
        var limit= parseInt(req.query.limit) || 10
        var sortby= req.query.sortby || 'id'
        var search= req.query.search || ''
        var order= req.query.order || 'ASC'
        modelBooks.getDataCombin(page,limit,sortby,search,order)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    updateBook: (req, res)=> {
        const idbook = {
            id : req.body.id
        }
        const data = {
            Title: req.body.Title,
            Description: req.body.Description,
            Image: req.body.Image,
            Date_Released: req.body.Date_Released,
            id_genre: req.body.id_genre,
            id_availability: req.body.id_availability
        }
        modelBooks.updateBookPromise(idbook,data)
            .then(result => res.send(result))
            .catch(err => console.log(err))

    },
    insertData: (req, res) => {
        const data = {
            Title: req.body.Title,
            Description: req.body.Description,
            Image: req.body.Image,
            Date_Released: req.body.Date_Released,
            id_genre: req.body.id_genre,
            id_availability: req.body.id_availability
        }
        modelBooks.insertBookPromise(data)
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    insertRent: (req, res) => {
        const idbook = {
            id: req.body.id
        }
        const ava= {
            id_availability: 0
        }
        modelBooks.insertRentPromise(idbook,ava)
            .then(result => res.send(result))
            .catch(err => console.log(err))
    },
    returnBook: (req,res) =>{
        const idbook={
            id : req.body.id
        }
        const ava={
            id_availability : 1
        }
        modelBooks.returnBookPromise(idbook,ava)
            .then(result => res.send(result))
            .catch(err =>console.log(err))
    },
    deleteBook: (req, res) =>{
        const idbook ={
            id: req.body.id
        }
        modelBooks.deleteBookPromise(idbook)
            .then(result => res.send(result))
            .catch(err => console.log(err))
    },
    search: (req,res) =>{
        const str={
            key: req.body.key
        } 
        modelBooks.searchBookPromise(str)
            .then(result => res.json(result))   
            .catch(err => console.log(err))
    },
    sortbytitle: (req, res) =>{
        modelBooks.sortbytitlePromise()
            .then(result => res.json(result))   
            .catch(err => console.log(err))
    },
    sortbyrelease: (req, res) =>{
        modelBooks.sortbyreleasePromise()
            .then(result => res.json(result))   
            .catch(err => console.log(err))
    },
    sortbygenre: (req, res) =>{
        modelBooks.sortbygenrePromise()
            .then(result => res.json(result))   
            .catch(err => console.log(err))
    },
    availability: (req, res) =>{
        modelBooks.availabilityPromise()
        .then(result => res.json(result))
        .catch(err => console.log(err))
    }
}