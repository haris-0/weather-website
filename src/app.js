const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hbs & views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Haris'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Haris'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help Page',
        title: 'Help',
        name: 'Haris'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address is missing'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send ({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast : 'It is 30 degrees',
    //     location : 'UP',
    //     address: req.query.address
    // })
})

// app.get('/product', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'Search missing'})
//     }
//     res.send({
//         product: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Haris',
        errorMessage: 'Help article not found!!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Haris',
        errorMessage: 'Page not found!!'
    })
})

app.listen(3000, () => {
    console.log('Server is up at 3000')
})