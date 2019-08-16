require('dotenv').config()

const express = require('express')    //mendefinisikan variabel
const app = express()
const logger = require('morgan')   
const bodyParser = require('body-parser')
const UserRoute = require('./src/routes/api')
const port = process.env.SERVER_PORT || 3030


app.listen(port, () => {  //arrow function
    console.log(`Server is running on Port ${port}`)  //mencetak
})

app.use(logger('dev')) //memnanggil fungsi logger
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/bookrent', UserRoute)

