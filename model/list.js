const mongoose = require('mongoose')
const { itemSchema} = require('./Notes')
const { Schema } = mongoose



const listShema = new Schema({
    name: String,
    items: [itemSchema]

})


module.exports = mongoose.model('List', listShema)