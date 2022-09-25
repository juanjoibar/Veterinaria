
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

router.get('/crear',(req,res)=>{
    res.render('crear')
})
router.post('/guardar',(req,res)=>{
    const body = req.body
    console.log(body)
    try {
         const mascotaDB = new Mascota(body);
         await mascotaDB.save()
         console.log('Mascota creada:'+mascotaDB)
         res.redirect('/mascotas');
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id',async(req,res)=>{
    const id = req.param.id
    try {
        const mascotaDB = await Mascota.findOne({  _id:id})
        console.log(mascotaDB);
        res.render('detalle',{
            mascota: mascotaDB,
            error: false

        })
    } catch (error) {
        console.log(error);
        res.render('detalle',{
            error: true,
            mensaje: 'no se encontro la mascota'


        })

    }
})
module.exports = router;
