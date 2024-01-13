const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide A Name"],
        trim: true,
        maxLenght: [30, 'Name can not be more than 30']
    },
    completed: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('Task',  TaskSchema)