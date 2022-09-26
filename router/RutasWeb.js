// RutasWeb.js
const express = require('express');
const router = express.Router();
const Mascota = require('../models/mascota');

router.get('/', (req, res) => {
    // console.log(__dirname)
    res.render("index", {titulo : "mi titulo dinámico"})
})

router.get('/json',async(req, res) => {
  //  res.render("jason", {tituloServicios: "Este es un mensaje dinámico de servicios"})
    // res.json(
    //     {estado:true,
    //     mensaje:'funciona'})
    

    try {
        console.log('hola3');
 
         const arrayMascotasDB = await Mascota.find()
         console.log(arrayMascotasDB)
         res.json(
            arrayMascotasDB
         )
 
     } catch (error) {
         console.log(error)
     }

})

router.get('/detalle', (req, res) => {
    res.render("detalle", {tituloServicios: "Este es un mensaje dinámico de servicios"})
})

module.exports = router;