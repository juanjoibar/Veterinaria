
const Mascota = require('../models/mascota')
router.get('/', async(req,res)=>{
    try {
        const arrayMascotasDB = await Mascotas.find()
        console.log(arrayMascotasDB)
        res.render("mascotas", {
           arrayMascotas: arrayMascotasDB
        })

    } catch (error) {
        console.log(error)
    }
}))