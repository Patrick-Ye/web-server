const path = require('path')
const express = require('express')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

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
    name: 'Peng Ye'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Peng Ye'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Peng Ye'
  })
})

app.get('/weather', (req, res) => {
  res.send({
    forecast: 'sunny',
    location:'Wuhan'
  })
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    errorMessage: 'Help article not found',
    title: '404',
    name: 'Peng Ye'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    errorMessage: 'Page not found.',
    title: '404',
    name: 'Peng Ye'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})