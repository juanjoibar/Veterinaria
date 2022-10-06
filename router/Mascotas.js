
const express = require('express');
const router = express.Router();

const Mascota = require('../models/mascota')

console.log('hola')
// router.get('/',(req,res)=> {
//     res.render("mascotas",
//     {listaMascotas: [ 
//     { id:'ddd', nombre:'eeee',descripcion:'eeee'},
//     { id:'ddde', nombre:'dddd',descripcion:'eeee'}        
// ] }
//     //{Mascotas: "Aquí irán todas las mascotas"}
    
//     )})

 

 router.get('/', async(req,res)=>{
     try {
        console.log('hola3');

         const arrayMascotasDB = await Mascota.find()
         console.log(arrayMascotasDB)

         arrayMascotasDB.push( {
           
            nombre: 'Mandy',
            descripcion: 'Salchicha'
          })  
         res.render("mascotas", {
            listaMascotas: arrayMascotasDB
         })

     } catch (error) {
         console.log(error)
     }
 })

 router.get('/', async(req,res)=>{
    try {
       console.log('hola3');

        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)
        console.log('hola4');
       
        res.render("jason", {
           listaMascotas: arrayMascotasDB
        })

    } catch (error) {
        console.log(error)
    }
})
router.get('/:id', async(req,res)=>{
   const id = req.params.id 
    try {
        const mascotaDB = await Mascota.findOne({_id: id})
        console.log(mascotaDB);
        res.render('detalle', {
            mascota: mascotaDB,
            error: false
        })
    } catch (error) {
       console.log(error) 
       res.render('detalle', {
        mensaje: 'No se encontro la mascota' ,
        error: true
    })
    }
})
router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id})
            if(mascotaDB){
                res.json({
                    estado:true,
                    mensaje: 'eliminado'
                })
            }else{
                res.json({
                    estado:false,
                    mensaje: 'No se pudo eliminar'
                })


            }

    } catch (error) {
        console.log(error);
    }
})

router.post('/', async(req,res)=>
{
    const body = req.body
    //console.log(body.nombre)
    try {
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()
        console.log(mascotaDB)
        res.redirect('/mascotas')


    } catch (error) {
        console.log(error)
    }
}
)
router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const mascotaDB = await Mascota.findByIdAndDelete({_id: id})
            if(mascotaDB){
                res.json({
                    estado:true,
                    mensaje: 'eliminado'
                })
            }else{
                res.json({
                    estado:false,
                    mensaje: 'No se pudo eliminar'
                })


            }

    } catch (error) {
        console.log(error);
    }
})

router.put('/:id', async(req,res)=>{
    const id = req.params.id
    const body = req.body
    try {
        const mascotaDB = await Mascota.findByIdAndUpdate(id,body,{useFindAndModify:false})
            
            
                res.json({
                    estado:true,
                    mensaje: 'Editado'
                })
            
    }

     catch (error) {
        console.log(error);
    }
})


// router.get('/crear',(req,res)=>{
//     res.render('crear')
// })
// router.post('/guardar',(req,res)=>{
//     const body = req.body
//     console.log(body)
//     try {
//          const mascotaDB = new Mascota(body);
//          await mascotaDB.save()
//          console.log('Mascota creada:'+mascotaDB)
//          res.redirect('/mascotas');
//     } catch (error) {
//         console.log(error);
//     }
// })

// router.get('/:id',async(req,res)=>{
//     const id = req.param.id
//     try {
//         const mascotaDB = await Mascota.findOne({  _id:id})
//         console.log(mascotaDB);
//         res.render('detalle',{
//             mascota: mascotaDB,
//             error: false

//         })
//     } catch (error) {
//         console.log(error);
//         res.render('detalle',{
//             error: true,
//             mensaje: 'no se encontro la mascota'


//         })

//     }
// })
module.exports = router;
