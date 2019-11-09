// Initialy load in our environment variables and node env variable is not on production
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY

const express = require('express')
const app = express()
const axios = require('axios')

// mentioning that we are using json for server and js
app.use(express.json())
app.use(express.static('public'))

app.post('/weather',(req,res) => {
    const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${req.body.latitude},${req.body.longitude}?units=auto`

    axios({
        url : url,
        responseType : 'json'
    }).then(data => res.json(data.data.currently))//the first data is the data parameter that is object swe are sending back second is data of api which is further having currently as object

    console.log(req.body)
})

app.listen(3000, ()=> {
    console.log("SERVER IS RUNNING")
})

// nodemon server.js to run server