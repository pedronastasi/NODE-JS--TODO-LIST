const mongoose = require("mongoose");
const { model, Schema } = mongoose;


const itemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    }
})

const modelNote = model('Note', itemSchema)

module.exports = { modelNote, itemSchema}
