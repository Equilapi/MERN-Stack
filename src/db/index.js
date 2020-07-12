const mongoose = require('mongoose')
const { MONGODB_URI } = require('../config')

const NAME_BD = `/mern-tasks`

mongoose.connect(`${MONGODB_URI}${NAME_BD}`, {
        useUnifiedTopology: true
    })
    .then(db => console.log('DB is connected!'))
    .catch(err => console.log(err))

module.exports = mongoose