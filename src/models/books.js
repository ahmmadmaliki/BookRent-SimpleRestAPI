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
    updateBookPromise: (data, id) =>{
        return new Promise((resolve, reject) => {
            conn.query('UPDATE book SET ? WHERE ?',[data,id], (err, result) => {
                if(result.affectedRows!=0){
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
    insertRentPromise: (id,ava,data) =>{
        return new Promise((resolve, reject) => {
            conn.query('SELECT id_availability FROM book where ?', id, (err,result)=>{
                if(result!=''){
                    Object.keys(result).forEach(function(key){
                        if(result[key].id_availability==0){
                            resolve("CANNOT BORROW THE BOOK! \n THE BOOK IS UNAVAILABLE")
                        }
                        else{
                            conn.query('INSERT rent SET ? ', data ,(err,result)=>{
                                console.log(result)
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
    returnBookPromise: (id, ava,status) =>{
        return new Promise((resolve, reject) => {
            conn.query('SELECT id,Status FROM rent WHERE ? ', id ,(err,result)=> {
                const n=result.length
                if(result===[]){
                    resolve("TRANSACTION ERROR!!")
                }else{
                    const data=result[n-1]
                    Object.keys(data).forEach(function(key){
                        if(data.Status=="Borrowed"){
                            conn.query('UPDATE book SET ? WHERE ?', [ava,id] , (err, result) => {
                                if (!err) {
                                    conn.query('UPDATE rent SET ? WHERE ?',[status,id],(err,result)=>{
                                        if(!err){
                                            resolve(result)
                                        }else{
                                            reject(err)
                                        }
                                    })
                                } else {
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
        })
    },
    getData: (page,limit) => {
        var offset=(page-1)*limit
        return new Promise((resolve, reject) => {
            conn.query('SELECT count(*) as total_book from book',(err,rows)=>{
               conn.query('SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
               JOIN genre on book.id_genre=genre.id \
               JOIN availability on book.id_availability=availability.id LIMIT ?,?',[offset,limit],(err,result)=>{
                 result.total_book=rows[0].total_book
                 const value=Object.assign({total_book: rows[0].total_book},result)
                    if (!err) {
                        resolve(value)
                    } else {
                        reject(err)
                    }
               }) 
            })
        })
    }, 
    getDataCombin: (page,limit,sortby,search,order) =>{
        var offset= (page-1)*limit
        return new Promise((resolve, reject) => {
                conn.query(`SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
                JOIN genre on book.id_genre=genre.id \
                JOIN availability on book.id_availability=availability.id WHERE Title LIKE '%${search}%' ORDER BY ${sortby} ${order} LIMIT ?,?  `, [offset,limit], (err, result) => {
                    
                    if(result!=''){
                           resolve(result)
                       }
                       else{
                           reject(err)
                       }
            })
          
        })

    },
    deleteBookPromise: (id)=>{ 
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM book WHERE ?', id, (err, result) => {
                if (result.affectedRows!='') {
                    resolve(result)
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
                 if(result!=''){
                        resolve(result)
                    }
                else{
                        reject(err)
                    }
            })
        })
    },
    sortPromise: (by,order) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT book.id, book.Title, book.Description, book.Image, book.Date_Released, genre.Genres, availability.Availability FROM book \
            JOIN genre on book.id_genre=genre.id \
            JOIN availability on book.id_availability=availability.id \
            ORDER BY ${by} ${order} `, (err, result) => {
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
    },
    historyPromise: ()=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * from rent', (err, result)=>{
                if(!err){
                    resolve(result)
            }else{
                reject(err)
            }
            })
        })
    }
}