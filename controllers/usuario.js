'use strict'
var Pago = require('../models/pago');
var Usuario = require('../models/usuario');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var jwt = require ('jsonwebtoken');
var bcrypt = require ('bcryptjs');
var config = require ('../config');


function prueba(req, res) {
    if (req.params.usuario_nombre) {
        var nombre = req.params.nombre_usuario;
    } else {
        var nombre = "sin usuario asignado"
    }
    res.status(200).send(
        {
            message: "usuario: " + nombre
        }
    )
}

function getUsuario(req, res) {
      var token = req.params.token;

      if (token) {
          jwt.verify(token, config.secret, function(err, decoded) {
          if (err) {
              res.status(500).send({ auth: false, message: 'Failed to authenticate token 1.' });
          } else {
              var promise = Usuario.findById(decoded.id,{password:0, info_pago:0},function(req , usuario){});
              promise.exec(function(err, usuario){
                  if (err) {
                      res.status(500).send({ message: 'Error al hacer la consulta.' });
                  } else {
                      if (!usuario) {
                          res.status(404).send({ message: 'Usuario no encontrado.' });
                      } else {
                          res.status(200).send({ usuario });
                      }
                  }
              });

          }
        });

      } else {
          res.status(401).send({ auth: false, message: 'Token no provisto.' });
      }
}



/*
var token = req.body.token;

if (token) {
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    } else {

    }
  });
} else {
    res.status(401).send({ auth: false, message: 'Token no provisto.' });
}
*/


function logingUsuario(req, res) {
    /*
    var autoId = req.params.params.id;
    res.status(200).send({ data: autoId})
    */
    var campo_busqueda = req.body.campo;
    var usuario_password = req.body.password;

    var promise = Usuario.
    findOne({ $or:[{'nombre_usuario' : campo_busqueda}, {'email' : campo_busqueda}]},
    function(req , usuario){});

    promise.exec(function(err,usuario){
       if(err){
          return console.log(err);
          res.status(500).send({ message: 'Error al obtener el dato', error: err });
       }else{
          if (!usuario) {
              res.status(404).send({ message: 'Contraseña o usuarios incorrecto.' });
          }
          else {
              var passwordIsValid = bcrypt.compareSync (usuario_password, usuario.password);
              if(passwordIsValid){
                var token = jwt.sign ({id: usuario._id}, config.secret, {
                  expiresIn: 86400 // caduca en 24 horas
                });
                res.status(200).send({ auth:true , token: token })
              }else{
                res.status(401).send({auth: false, token: null});
              }
          }
       }
    });

}


function saveUsuario(req, res) {
    /*
    var params = req.body;
    res.status(200).send({ metodo: "saveAuto", auto: params})
    */
    var hashedPassword = bcrypt.hashSync (req.body.password, 8);
    req.body.password = hashedPassword;
    var usuario = new Usuario(req.body);

    usuario.save(function (err, usuarioSaved) {
      if (err) {
          console.log(err)
          res.status(500).send({ message: 'Error al registrar al usuario.', error: err });
      }
      else {
          var token = jwt.sign ({id: usuarioSaved._id}, config.secret, {
            expiresIn: 86400 // caduca en 24 horas
          });
          res.status(200).send({auth: true, token: token})
      }
    });
}

function updateUsuario(req, res) {
    /*
    var params = req.body;
    res.status(200).send({ metodo: "updateAuto", auto: params})
    */
    var token = req.params.token;

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.status(500).send({ auth: false, message: 'Failed to authenticate token 2.' });
        } else {
            var hashedPassword = bcrypt.hashSync (req.body.password, 8);
            req.body.password = hashedPassword;
            Usuario.findByIdAndUpdate(decoded.id, req.body, function (err, usuarioUpdate) {
                if (err) {
                    console.log(err)
                    res.status(500).send({ message: 'Error al actualizar el campo.', error: err })
                } else {
                    if (!usuarioUpdate) {
                        res.status(404).send({ message: 'No se encuentra el usuario.' });
                    }
                    else {
                        res.status(200).send({ message: 'Datos actualizados.' });
                    }
                }
            });
        }
      });
    } else {
        res.status(401).send({ auth: false, message: 'Token no provisto.' });
    }


}

function deleteUsuario(req, res) {
    var token = req.params.token;
    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.status(500).send({ auth: false, message: 'Failed to authenticate token 3.' });
        } else {
            Pago.findOneAndDelete({'usuario':decoded.id}, function(err, pagoDeleted){
                if (err) {
                    res.status(500).send({ message: 'Error al eliminar el pago del usuario.', error: err })
                }else{
                    if (!pagoDeleted) {
                        res.status(404).send({ message: 'El usuario no cuenta con metodo de pago.' });
                    }else{
                        res.status(200).send({ message: 'El pago del usuario ha sido eliminado.' })
                    }
                }
            });

            Usuario.findByIdAndRemove(decoded.id, function(err,usuarioDelated){
                if (err) {
                    console.log(err)
                    res.status(500).send({ message: 'Error al eliminar el usuario.', error: err })
                }else{
                    if (!usuarioDelated) {
                        res.status(404).send({ message: 'No esta el usuario.' });
                    }else{
                        res.status(200).send({ message: 'Usuario eliminado.' })
                    }
                }
            });
        }
      });
    } else {
        res.status(401).send({ auth: false, message: 'Token no provisto.' });
    }

}


module.exports = {
    prueba,
    logingUsuario,
    getUsuario,
    saveUsuario,
    updateUsuario,
    deleteUsuario
}
