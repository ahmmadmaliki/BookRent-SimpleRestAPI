const conn = require('../configs/db')
const jwt = require('jsonwebtoken')

module.exports ={
    userRegist: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT user SET ?', data, (err, result) => {
                if (!err) {
                    resolve("REGISTRATION SUCCESSFUL!")
                } else {
                    reject(err)
                }
            })
            
           
        })
    },
    userLogin: (data) =>{
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM user WHERE username='${data.username}'`, (err, result) => {
                Object.keys(result).forEach(function(key) {
                    const iden= JSON.parse(JSON.stringify(result[key]))
                    jwt.sign(iden,process.env.SECRET_KEY,{expiresIn: '30s'}, (err,token)=>{
                        if (!err) {
                            resolve(token)
                        } else {
                            reject(err)
                        }
                    })
                 })
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