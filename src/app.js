const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
//get the heroku port or use 3000
const port = process.env.PORT || 3000

//customize the web server with paths
const publicFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views loaction
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//set static resources folder
app.use(express.static(publicFolder))

app.get('', (req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'George York'
    })
})


app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About',
        name: 'George York'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'George York',
        message: 'This is a very helpfull message'
    })
})

app.get('/weather', (req, res) =>{
   
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
           return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
           if(error){
              return res.send({error})
           }
           res.send({
               forecast: forecastData,
               location,
               address: req.query.address
           })
        })
     })
})

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: '404',
        name: 'George York',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'George York',
        error: 'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})