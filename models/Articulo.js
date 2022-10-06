const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const articuloSchema = Schema(
    {

    codigo: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    descripcion: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    
    gtin: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    dia: {
        type: Date,
        default: Date.now
    }
}) 
// crear modelo 
module.exports  = mongoose.model('Articulo',articuloSchema);