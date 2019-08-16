const conn = require('../configs/db')

module.exports = {
    insertBookPromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT book SET ?', data, (err, result) => {
                if (!err) {
                    resolve("ONE BOOK HAS BEEN ADDED")
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
                    resolve("UPDATE SUCCESSFUL!!")
                } else {
                    reject(err)
                }
            })
        })
    },
    insertRentPromise: (id,ava) =>{
        return new Promise((resolve, reject) => {
            conn.query('SELECT id_availability FROM book where ?', id, (err,result)=>{
                console.log(result)
                if(result!=''){
                    Object.keys(result).forEach(function(key){
                        if(result[key].id_availability==0){
                            resolve("CANNOT BORROW THE BOOK! \n THE BOOK IS UNAVAILABLE")
                        }
                        else{
                            conn.query('INSERT rent SET ? ', id ,(err,result)=>{
                                if(!err){
                                    conn.query('UPDATE book SET ? WHERE ?', [ava,id] ,(err,result)=>{
                                        if(!err){
                                            resolve("TRANSACTION SUCCESSFUL!")
                                        }
                                        else{
                                            reject(err)
                                        }
                                    })
                                }
                                else{
                                    reject(err)
                                }
                            })
                        }
                    })
                } 
                else{
                    reject("TRANSACTION ERROR!!")
                }
            })    
        })
    },
    returnBookPromise: (id, ava) =>{
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM rent WHERE ? ', id ,(err,result)=> {
                if(result.affectedRows==0){
                    resolve("TRANSACTION ERROR!!")
                }else{
                    conn.query('UPDATE book SET ? WHERE ?', [ava,id] , (err, result) => {
                        if (!err) {
                            resolve("TRANSACTION SUCCESSFUL!")
                        } else {
                            reject(err)
                        }
                    })
                }
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
                    if(result!=''){
                        resolve(result)
                    }
                    else{
                        resolve("NOT FOUND!")
                    }
                } else {
                    reject(err)
                }
            })
        })
    },
    sortbytitlePromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
            JOIN genre on book.id_genre=genre.id \
            JOIN availability on book.id_availability=availability.id \
            ORDER BY book.Title ${data} `, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    sortbyreleasePromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
            JOIN genre on book.id_genre=genre.id \
            JOIN availability on book.id_availability=availability.id \
            ORDER BY book.Date_Released ${data}`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    sortbygenrePromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
             JOIN genre on book.id_genre=genre.id \
             JOIN availability on book.id_availability=availability.id \
             ORDER BY genre.Genres ${data}`, (err, result) => {
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