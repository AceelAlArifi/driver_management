const mongoose = require('mongoose')
const Schema = mongoose.Schema
const driverSchema = new Schema({
        name: { type: String, required: true },
        age: Number, 
        image: String
    })

const Driver = mongoose.model('Driver', driverSchema)
module.exports = Driver;

