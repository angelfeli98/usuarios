var bodyParser = require('body-parser')
var express = require('express')

var app = express()

var api = require('./routers/usuario')
var api2 = require('./routers/pago')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use(function(req,res,next){
    //puede ser consumidad desde cualquier lugar
    res.header('Acces-Control-Allow-Origin','*');
    //cabeceras perimtidas
    res.header('Acces-Control-Allow-Headers','X-API-KEY,Origin,X-Requested-With,Content-Type,Accept, Acces-Control-Requested-Method');
    //metodos permitidos
    res.header('Acces-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Allow','GET,PUT,DELETE,POST');
    next()
});


app.use('/api',api);
app.use('/api',api2);


module.exports = app;
