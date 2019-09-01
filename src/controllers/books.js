const modelBooks = require('../models/books')

module.exports = {
    getAll: (req, res) => {
        var page= parseInt(req.query.page)
        var limit= parseInt(req.query.limit)
        if(isNaN(page)|| page<1)
            page=1
        if(isNaN(limit))
            limit=20
        else if(limit>20)
            limit=20
        else if(limit<1)
            limit=10 
        modelBooks.getData(page,limit)
            .then(result => res.json({
                success: true,
                message: 'Data found',
                pagination: {
                    current_page: page,
                    per_page: limit,
                    total_page: Math.ceil(result.total_book/limit)
                },
                data: result
            }))
            .catch(err => console.log(err))
            
    },
    combination: (req, res) =>{
        var page= parseInt(req.query.page) || 1
        var limit= parseInt(req.query.limit) || 10
        var sortby= req.query.sortby || 'id'
        var search= req.query.search || ''
        var order= req.query.order || 'ASC'
        modelBooks.getDataCombin(page,limit,sortby,search,order)
            .then(result => res.json({
                success: true,
                message: 'Data found',
                sort_by: sortby,
                data: result
            }))
            .catch(err => res.json({
                success: false,
                message: 'Data not found',
                data: {}
            }))
    },
    updateBook: (req, res)=> {
        const datum= {
            id: req.query.id        
        }
        const category = {
            Title: req.query.Title,
            Description: req.query.Description,
            Image: req.query.Image,
            Date_Released: req.query.Date_Released,
        }
        const data= Object.assign({id: req.query.id},category)
        modelBooks.updateBookPromise(category, datum)
            .then(result => res.json({success: true, message: 'Book updated successfully',data}))
            .catch(err => res.json({success: false, message: `Id doesn't exist or invalid`,data:{}}))
        
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
            .then(result => res.json({success: true, message: 'Book added successfully',data}))
            .catch(err => res.json(err))
    },
    insertRent: (req, res) => {
        const idbook = {
            id: req.body.id
        }
        const data={
            id: req.body.id,
            Date_Borrow: req.body.Date_Borrow,
            Date_Back: req.body.Date_Back,
            Status: req.body.Status
        }
        const ava= {
            id_availability: 0
        }
        modelBooks.insertRentPromise(idbook,ava,data)
            .then(result => res.send(result))
            .catch(err => res.send(err))
    },
    returnBook: (req,res) =>{
        const idbook={
            id : req.body.id
        }
        const ava={
            id_availability : 1
        }
        const status={
            Status: 'Returned'
        }
        modelBooks.returnBookPromise(idbook,ava,status)
            .then(result => res.send(result))
            .catch(err =>console.log(err))
    },
    deleteBook: (req, res) =>{
        const idbook ={
            id: req.query.id
        }
        modelBooks.deleteBookPromise(idbook)
            .then(result => res.json({success: true, message: 'Category deleted successfully',data: {} }))
            .catch(err => res.json({success: false, message: `Id doesn't exist or invalid`, data: {}}))
    },
    search: (req,res) =>{
        const str={
            key: req.query.key
        } 
        modelBooks.searchBookPromise(str)
            .then(result => res.json({
                success: true,
                message: 'Data found',
                data: result
            }))   
            .catch(err => res.json({
                success: false,
                message: 'Data not found',
                data: {}
            }))
    },
    sortBook: (req, res) =>{
        const by= req.query.by
        const order=req.query.order || 'ASC'
        modelBooks.sortPromise(by,order)
            .then(result => res.json({
                success: true,
                message: 'Data sorted',
                data: result
            }))   
            .catch(err => res.json({
                success: false,
                message: 'Sorting only by Title, Date Released, or Genre',
                data: {}
            }))
    },
    availability: (req, res) =>{
        modelBooks.availabilityPromise()
        .then(result => res.json({
            success: true,
            message: 'Book by availability',
            data: result
        }))
        .catch(err => res.json(err))
    },
    history: (req,res)=>{
        modelBooks.historyPromise()
        .then(result=>res.json({
            success: true,
            message: 'History transaction',
            data: result
        }))
    }

}