const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const selectefStudentSchema  = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    stream: {
        type: String,
        required: true,
    },

    Studentid: {
        type: Schema.Types.ObjectId, ref: 'student',
        required: true,
    },
    message: {
        type: String,
        default: 'you are selected ',
    },
    companyId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('selectedStudent', selectefStudentSchema)