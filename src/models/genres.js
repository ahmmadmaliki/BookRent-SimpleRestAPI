const conn = require('../configs/db')

module.exports = {
    
    insertGenrePromise: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM genre WHERE Genres LIKE '%${data.Genres}%'`,(err,rows)=>{ 
                console.log(rows)
                if(rows.length!=0){
                    reject(err)
                }else{
                    conn.query('INSERT genre SET ?',data,(err,result)=>{
                        if(!err){
                            resolve(result)
                        } else{
                            reject(err)
                        }
                    })
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
    updateGenrePromise: (data, genres)=>{
        return new Promise((resolve, reject) => {
            conn.query('UPDATE genre SET ? WHERE ?', [genres, data], (err, result) => {
               if(result.affectedRows!='') {
               resolve(result)
                } else {
                        reject(err)
                }
            })
        })
    },
    deleteGenrePromise: (data) =>{
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM genre WHERE ?', data, (err, result) => {
                if (result.affectedRows!=0) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })

    }
}