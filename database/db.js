const mongoose = require('mongoose')

async function mondoDBconnection() {
    try {
        mongoose.connect("mongodb://localhost:27017/todolistDB")
        console.log('DB connected')
    } catch (error) {
        throw new Error(error)
    }
}


module.exports = mondoDBconnection