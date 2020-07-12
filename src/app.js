const express = require('express')
const morgan = require('morgan')
const path = require('path')

require('./db')
const app = express()


// Middleware
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/api/tasks', require('./routes/task.routes'))

// Static files
app.use(express.static(path.join(__dirname + '/public' )))

module.exports = app