const mongoose = require('mongoose')

var kittySchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('User', kittySchema)