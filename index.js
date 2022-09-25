const http = require('http');
const server = http.createServer((req, res)=> {
    res.end('estoy contestando tu solicitudv2')

})

const puerto = '3000'
server.listen(puerto, ()=>{
    console.log('escuchando solicitudes')
})