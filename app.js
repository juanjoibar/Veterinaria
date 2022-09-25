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
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000; 
const mongoose = require('mongoose');

// const usuario = "expressVete"
// const password = "PX5scYdDlkyN0DoI"
// const dbName = "veterinaria"

//const uri = `mongodb+srv://${usuario}:${password}@cluster0.ncdk5.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.sgfeuwe.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

