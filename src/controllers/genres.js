const modelGenres = require('../models/genres')

module.exports = {
    getAll: (req, res) => {

        modelGenres.getData()
            .then(result => res.json(result))
            .catch(err => console.log(err))

    },
    insertData: (req, res) => {
        const data = {
            Genres: req.body.Genre
        }
        modelGenres.insertGenrePromise(data)
            .then(result => res.json({success: true, message: 'Genre successfully added', data}))
            .catch(err => res.json({success: false, message: 'Genre already exist',data:{}}))
    },
    updateGenre: (req,res) =>{
        const datum ={
            id: req.query.id
        }
        const genre={
            Genres: req.query.Genre
        }
        const data= Object.assign({id: req.query.id},genre)
        modelGenres.updateGenrePromise(datum,genre)
        .then(result => res.json({success: true, message: 'Genre updated successfully', data}))
            .catch(err =>res.json({success: false, message: `Id doesn't exist or invalid`, data:{}}))
    },
    deleteGenre: (req, res) =>{
        const data= {
            id: req.query.id
        }
        modelGenres.deleteGenrePromise(data)
        .then(result => res.json({success: true, message: 'Genre deleted successfully', data:{}}))
            .catch(err => res.json({success: false, message: `Id doesn't exist or invalid`,data: {}}))
    }
}