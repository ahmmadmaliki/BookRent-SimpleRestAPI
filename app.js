require('dotenv').config()

const express = require('express')   
const app = express()
const logger = require('morgan')   
const bodyParser = require('body-parser')
const UserRoute = require('./src/routes/api')
const PORT = process.env.SERVER_PORT || 3030
const cors= require('cors')


app.listen(PORT, () => {  
    console.log(`Server is running on Port ${PORT}`)  
})

app.use(logger('dev')) 
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/bookrent', UserRoute)

