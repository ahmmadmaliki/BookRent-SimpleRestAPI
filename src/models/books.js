const conn = require('../configs/db')

module.exports = {
    insertBookPromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT book SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    updateBookPromise: (id,data) =>{
        return new Promise((resolve, reject) => {
            conn.query('UPDATE book SET ? WHERE ?', [data, id], (err, result) => {
                if (!err) {
                    resolve("UPDATE SUCCESSFULL")
                } else {
                    reject(err)
                }
            })
        })
    },
    insertRentPromise: (id,ava) =>{
        return new Promise((resolve, reject) => {
            conn.query('SELECT id_availability FROM book where ?', id, (err,result)=>{
                Object.keys(result).forEach(function(key) {
                    if(result[key].id_availability==0){
                        if(!err){
                            resolve("CANNOT BORROW THE BOOK! \n THE BOOK IS UNAVAILABLE")
                        }
                        else{
                            reject(err)
                        }
                    }
                    else{
                        if(!err){
                            conn.query('INSERT rent SET ? ', id ,()=> {
                                conn.query('UPDATE book SET ? WHERE ?', [ava,id] , () => {
                                    if (!err) {
                                        resolve("TRANSACTION SUCCESSFUL!")
                                    } else {
                                        reject(err)
                                    }
                                })
                
                            })
                        }
                        else{
                            reject(err)
                        }
                    }
                })
                
            })
            
        })
    },
    returnBookPromise: (id, ava) =>{
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM rent WHERE ? ', id ,()=> {
                conn.query('UPDATE book SET ? WHERE ?', [ava,id] , (err, result) => {
                    if (!err) {
                        resolve("TRANSACTION SUCCESSFUL!")
                    } else {
                        reject(err)
                    }
                })

            })
            
        })
    },
    getData: (page,limit) => {
        var offset=(page-1)*limit
        return new Promise((resolve, reject) => {
            conn.query('SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
             JOIN genre on book.id_genre=genre.id \
             JOIN availability on book.id_availability=availability.id LIMIT ?,?', [offset,limit], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }, 
    getDataCombin: (page,limit,sortby,search,order) =>{
        var offset= (page-1)*limit
        return new Promise((resolve, reject) => {
            conn.query(`SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
             JOIN genre on book.id_genre=genre.id \
             JOIN availability on book.id_availability=availability.id WHERE Title LIKE '%${search}%' ORDER BY ${sortby} ${order} LIMIT ?,?  `, [offset,limit], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })

    },
    deleteBookPromise: (id)=>{ 
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM book WHERE ?', id, (err, result) => {
                if (!err) {
                    resolve("Book has been deleted!")
                } else {
                    reject(err)
                }
            })
        })
    },
    searchBookPromise: (str) =>{
        return new Promise((resolve, reject) => {
            conn.query(`SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book  \
            JOIN genre on book.id_genre=genre.id \
            JOIN availability on book.id_availability=availability.id \
            WHERE Title LIKE '%${str.key}%'`,(err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    sortbytitlePromise: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
            JOIN genre on book.id_genre=genre.id \
            JOIN availability on book.id_availability=availability.id \
            ORDER BY book.Title ASC', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    sortbyreleasePromise: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
            JOIN genre on book.id_genre=genre.id \
            JOIN availability on book.id_availability=availability.id \
            ORDER BY book.Date_Released ASC', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    sortbygenrePromise: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
             JOIN genre on book.id_genre=genre.id \
             JOIN availability on book.id_availability=availability.id \
             ORDER BY genre.Genres ASC', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    availabilityPromise: () =>{
        return new Promise((resolve, reject) => {
            conn.query('SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
             JOIN genre on book.id_genre=genre.id \
             JOIN availability on book.id_availability=availability.id \
             ORDER BY availability.Availability ASC', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    }
}