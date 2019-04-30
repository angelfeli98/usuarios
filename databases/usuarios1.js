const uri= "mongodb://localhost:20002/Paax";
var usuario = require('mongoose');

options = {
  useNewUrlParser: true
};

usuario.connect(uri,options,function (err) {

   if (!err){
      console.log('Successfully connected to server1');
    }else{
      console.log('Error al conectarse al server1');
    }
});

module.exports = exports = usuario;
