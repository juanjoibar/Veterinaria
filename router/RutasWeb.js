// RutasWeb.js
const express = require('express');
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