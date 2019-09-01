const conn = require('../configs/db')
const jwt = require('jsonwebtoken')

module.exports ={
    userRegist: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT username, email FROM user', (err, result)=>{
                let i=0; 
                result.map((item,index)=>{  
                    if(item.username==data.username||item.email==data.email){
                        reject(err)
                        i++
                    }
                })
                if(i==0){
                        conn.query('INSERT user SET ?', data, (err, result) => {
                            if (!err) {
                                resolve(result)
                            } else {
                                reject(err)
                            }
                        })
                }
                
            })
        })
    },
    userLogin: (data) =>{
        return new Promise((resolve, reject) => {
            conn.query(`SELECT id_user,username,email FROM user WHERE username='${data.username}'`, (err, result) => {
                if(result!=''){
                    Object.keys(result).forEach(function(key) {
                        const iden= JSON.parse(JSON.stringify(result[key]))
                        jwt.sign(iden,process.env.SECRET_KEY, (err,result)=>{
                            if (!err) {
                                resolve(result)
                            } else {
                                reject(err)
                            }
                        })
                     })
                }else{
                    reject(err)
                }
              
            })
        })
    },
    userVerify: (data) =>{
        return new Promise((resolve, reject) => {
            jwt.verify(data,process.env.SECRET_KEY, (err,authData)=>{
                if(!err){
                    resolve(authData)
                }else{
                    reject(err)
                }
            })
        })
    }
}