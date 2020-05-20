const uri = "mongodb+srv://feli:feli@cluster0-4mvut.mongodb.net/test?retryWrites=true&w=majority";

options = {
  useNewUrlParser: true
};

var usuario2 = require('mongoose');


usuario2.connect(uri,options,function (err) {

  if (!err){
     console.log('Successfully connected to server2');
   }else{
     console.log('Error al conectarse al server2');
   }
});

module.exports = exports = usuario2;
