const uri = "mongodb+srv://angelfelipe:angelfelipe@servidor2-ubkzd.mongodb.net/test?retryWrites=true";

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
