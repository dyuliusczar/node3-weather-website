const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { readdirSync } = require('fs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'June'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'abut cheems',
        name: 'June'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need help?',
        name: 'June',
        helpText: 'It\'s okay to ask for help :)'
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid location'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send( {
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'page not foumd, u lost fremd?',
        name: 'Jume',
        errorMessage: 'u havin ruff day fremd? '
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'errr paw ow paw (404)',
        name: 'jub',
        errorMessage: 'page not foumd'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})