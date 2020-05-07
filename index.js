'user stric'

var app = require('./app');
var database = require('./conection');

//comentario
var port = process.env.PORT || 7070;

app.listen(7070, function(){
    console.log('Servicio de usuario corriendo')
});
