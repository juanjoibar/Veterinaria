const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mascotaShema = new Schema (
    {
        nombre:String,
        descripcion:String
    }
) 

const Mascota = mongoose.model('Mascota',mascotaShema);
module.exports = Mascota;