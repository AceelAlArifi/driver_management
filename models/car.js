const mongoose = require('mongoose')
const Schema = mongoose.Schema
const carSchema = new Schema({
        name: { type: String, required: true },
        model: { type: String, required: true },
        image: String,
        year: Number
});

const Car = mongoose.model('Car', carSchema)
module.exports = Car;

