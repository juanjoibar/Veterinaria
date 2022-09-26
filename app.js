const frutas = ["banana", "banana", "pera", "banana"];

frutas.forEach((fruta) => {
  console.count(fruta);
});

const  cowsay = require("cowsay");
console.log(cowsay.say({
    text: "soy un modulo",
    e : "o0",
    T : "U "
}));

const express = require('express');
//const express = require("express");
//const app = express();




const bodyParser = require('body-parser'); 
const app = express();
//require('dotenv').config()
const port = process.env.PORT || 3000; 


//  app.get('/', (req, res) => {
//    res.send('Hello World!');
//  });
//Rutas web
app.use(express.static(__dirname + "/public"));
app.use('/', require('./router/RutasWeb'));
app.use('/mascotas', require('./router/Mascotas'));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");





// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const mongoose = require('mongoose');

 const usuario = "expressVete"
 const password = "PX5scYdDlkyN0DoI"
 const dbName = "veterinaria"

const uri = `mongodb+srv://${usuario}:${password}@cluster0.sgfeuwe.mongodb.net/${dbName}?retryWrites=true&w=majority`;
//const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.sgfeuwe.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

//mongodb+srv://expressVete:<password>@cluster0.sgfeuwe.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

