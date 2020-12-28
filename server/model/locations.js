const mongoose = require('mongoose')

const locSchema = new mongoose.Schema({
      name: String,
      lat: Number,
      lng: Number
})

module.exports  = mongoose.model('location', locSchema);
