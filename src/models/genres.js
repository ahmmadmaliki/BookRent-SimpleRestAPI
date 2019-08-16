const conn = require('../configs/db')

module.exports = {
    
    insertGenrePromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT genre SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    getData: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM genre', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    updateGenrePromise: (data)=>{
        return new Promise((resolve, reject) => {
            conn.query('UPDATE genre SET ? WHERE id=?', [data, data.id], (err, result) => {
                if (!err) {
                    resolve("UPDATE SUCCESSFULL! ")
                } else {
                    reject(err)
                }
            })
        })
    },
    deleteGenrePromise: (data) =>{
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM genre WHERE ?', data, (err, result) => {
                if (!err) {
                    resolve("GENRE HAS BEEN DELETED! ")
                } else {
                    reject(err)
                }
            })
        })

    }
}