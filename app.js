require('dotenv').config()

const express = require('express')    //mendefinisikan variabel
const app = express()
const logger = require('morgan')   
const bodyParser = require('body-parser')
const UserRoute = require('./src/routes/api')

const jwt=require('jsonwebtoken')
const port = process.env.SERVER_PORT || 3030


app.listen(port, () => {  //arrow function
    console.log(`Server is running on Port ${port}`)  //mencetak
})

app.use(logger('dev')) //memnanggil fungsi logger
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/bookrent', UserRoute)

app.post('/bookrent/login', (req, res)=>{
    const user = {
        id: 1,
        username: 'maliki',
        email: 'amadmaliki@gmail.com'
    }
    jwt.sign(user,'secretkey',{expiresIn: '30s'}, (err,token)=>{
        res.json({
            token
        })
    })
})
app.post('/bookrent/post',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            res.send(403)
        }else{
            res.json({
                message: 'Post created...',
                authData
            })
        }
    
    })
})
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers.authorization
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer= bearerHeader.split(' ')
        //get token from array
        const bearerToken= bearer[1]
        //set the token
        req.token= bearerToken
         //next middleware
            next()
    } else{
        res.sendStatus(403)
    }
   
}
