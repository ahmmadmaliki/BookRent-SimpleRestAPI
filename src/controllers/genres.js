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
            .then(result => res.json(result))
            .catch(err => console.log(err))
    },
    updateGenre: (req,res) =>{
        const data ={
            id: req.body.id,
            Genres: req.body.Genre
        }
        modelGenres.updateGenrePromise(data)
        .then(result => res.send(result))
            .catch(err => console.log(err))
    },
    deleteGenre: (req, res) =>{
        const data= {
            id: req.body.id
        }
        modelGenres.deleteGenrePromise(data)
        .then(result => res.send(result))
            .catch(err => console.log(err))
    }
}