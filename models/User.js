const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usuarioSchema = Schema(
    {

    nombre: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    dia: {
        type: Date,
        default: Date.now
    }
}) 
// crear modelo 
module.exports  = mongoose.model('User',usuarioSchema);