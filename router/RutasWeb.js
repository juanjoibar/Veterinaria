// RutasWeb.js

const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const cheerio2 = require('cheerio');

const router = express.Router();
const Mascota = require('../models/mascota');
// constraseña
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
         for (let i = 0; i < 15; i++) {
            
            arrayMascotasDB.push( {
              
               nombre: 'Mandy'+i.toString(),
               descripcion: 'Salchicha'
             }) 
             
             
            }
            arrayMascotasDB.push( {
           
            nombre: 'Lon',
            descripcion: 'Dogo'
          }) 
         res.json(
            arrayMascotasDB
         )
 
     } catch (error) {
         console.log(error)
     }

})




router.get('/jscraping',async(req, res) => {
    //  res.render("jason", {tituloServicios: "Este es un mensaje dinámico de servicios"})
      // res.json(
      //     {estado:true,
      //     mensaje:'funciona'})
      
  
      try {
          console.log('hola3');
   
           const {data} = await axios.get("https://dolarhoy.com/");
           var dolar = cheerio.load(data);
          
         
            var selectorDolarBlue = "#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-5 > div > div.values > div.venta > div.val"
            var selectorDolarOficial = "#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-7.is-vertical > div:nth-child(2) > div > div.venta > div.val"
            var SelectoFecha = "#home_0 > div.modulo.modulo_bloque > section > div > div > div > div.tile.is-parent.is-9.cotizacion.is-vertical > div > div.tile.is-parent.is-5 > div > div.tile.update > span"
           console.log('test:');

       } catch (error) {
           console.log(error)
       }
       try {
        const {data} = await axios.get("https://www.bna.com.ar/Personas");
        var euro = cheerio2.load(data);
        var selectorEuroOficial = "#billetes > table > tbody > tr:nth-child(2) > td:nth-child(3)"
           
        
       } catch (error) {
        
    }
    const dolarOficial =   parseFloat(dolar(selectorDolarOficial).text().slice(1,-1)    );
    const dolarTarj =    dolarOficial*0.3 + dolarOficial*0.3  + dolarOficial*1 
    const dolarQuat =    dolarOficial*0.3 + dolarOficial*0.3 + dolarOficial*0.25  + dolarOficial*1 
    const dolarTarjeta = '$' + dolarTarj
    const dolarQuatar = '$' + dolarQuat
    console.log(dolarTarjeta) ;

       const objetoValores = {
        FechaActualizacion: dolar(SelectoFecha).text(),
        DolarBlue:  dolar(selectorDolarBlue).text(),
        DolarOficial: dolar(selectorDolarOficial).text(), 
        EuroOficial: euro(selectorEuroOficial).text(),
        DolarTarjeta: dolarTarjeta ,
        DolarQuatar: dolarQuatar
        };

       res.json(
        objetoValores
       );

  
  })





router.get('/crear', (req, res) => {
    res.render("crear", {tituloServicios: "Este es un mensaje dinámico de servicios"})
})

router.get('/detalle', (req, res) => {
    res.render("detalle", {tituloServicios: "Este es un mensaje dinámico de servicios"})
})



//Usuario nuevo
const User = require('../models/User')
// Validacion de usuario
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    nombre: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

router.post('/register', async (req,res)=>{

    const {error} = schemaRegister.validate(req.body)

    if(error){
        return res.status(400).json({error:error.details[0].message})
    }
    console.log(req.body.email)
    const existeEmail = await User.findOne({email: req.body.email})
    
    if (existeEmail)return res.status(400).json({error:true, mensaje: 'email ya registrado'})
    
      // hash contraseña
      const salt = await bcrypt.genSalt(5);
      const password = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({

            nombre: req.body.nombre,
            email: req.body.email,
            password: password
        }) 

    try {
            const userDB = await user.save();
            res.json(
                {
                    error: null,
                    data: userDB
                }
            ) 
        
    } catch (error) {
        res.status(400).json(error)
    }


   
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})
router.post('/login', async(req,res)=>{
    const {error} = schemaLogin.validate(req.body)

    if(error){
        return res.status(400).json({error:error.details[0].message})
    }   
    const user = await User.findOne( {email:req.body.email})
    if(!user) return res.status(400).json({error: 'Email o password incorrecto'})
    const passvalida = await bcrypt.compare(req.body.password, user.password)
    if(!passvalida) return res.status(400).json({error: 'email o password incorrecto'})
    
    const token = jwt.sign({
        nombre: user.nombre,
        id: user._id}
        ,process.env.TOKEN_SECRET)
    

    res.json({
        error:null,
        mensaje:'Bienvenido',
        token: token
    })

})


module.exports = router;