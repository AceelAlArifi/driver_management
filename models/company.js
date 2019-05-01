const mongoose = require('mongoose')
const Schema = mongoose.Schema
const driverSchema = require('./driver').schema
const companySchema = new Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    telephone: { type: String, required: true },
    drivers: [ driverSchema ],
    cars: [{ 
        name: { type: String, required: true }, 
        model: { type: String, required: true }, 
        image: String, 
        year: Number }]
}, { timestamps: true })

const Company = mongoose.model('Company', companySchema)
module.exports = Company;

