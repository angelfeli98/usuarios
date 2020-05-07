'use strict'

var Pago = require('../models/pago');
var Usuario = require('../models/usuario');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
var jwt = require ('jsonwebtoken');
var bcrypt = require ('bcryptjs');
var config = require ('../config');

function prueba(req, res) {
    if (req.params.id) {
        var id = req.params.id
    } else {
        var id = "SIN ID"
    }
    res.status(200).send(
        {
            message: "Este es el id " + id
        }
    )
}

function getPago(req, res) {
    /*
    var autoId = req.params.params.id;
    res.status(200).send({ data: autoId})
    */
    var token = req.params.token;

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.status(500).send({ auth: false, message: 'Erro al autenticar el token.' });
        } else {
            var userId = decoded.id;

            var idValido = mongoose.Types.ObjectId.isValid(userId);

            if (!idValido) {
                res.status(409).send({ message: 'Id no valido' });
            }
            else {
                Pago.findOne({'usuario': userId}, function (err, pago) {
                    if (err) {
                        console.log(err)
                        res.status(500).send({ message: 'Error al obtener el dato', error: err });
                    } else {
                        if (!pago) {
                            res.status(404).send({ message: 'No esta la info de pago.' });
                        }
                        else {
                            res.status(200).send({ pago })
                        }
                    }
                });
            }
        }
      });
    } else {
        res.status(401).send({ auth: false, message: 'Token no provisto.' });
    }
}


function savePago(req, res) {
    /*
    var params = req.body;
    res.status(200).send({ metodo: "saveAuto", auto: params})
    */
    var token = req.params.token;

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.status(500).send({ auth: false, message: 'Erro al autenticar el token.' });
        } else {
            var hashedCvv = bcrypt.hashSync(req.body.cvv.toString());
            req.body.cvv = hashedCvv;
            req.body.usuario = decoded.id;
            var idusuario = null;
            var pago = new Pago(req.body);

            pago.save(function (err, pagoSaved) {
                if (err) {
                    console.log(err)
                    res.status(500).send({ message: 'Error al guardar el pago.', error: err });
                }
                else {
                    var promise = Usuario.findById(decoded.id,{password:0, info_pago:0},function(req , usuario){
                        //idusuario = usuario._id;
                    });
                    promise.exec(function(err, usuario){
                        if (err) {
                            res.status(500).send({ message: 'Error al hacer la consulta.' });
                        } else {
                            if (!usuario) {
                                res.status(404).send({ message: 'Usuario no encontrado.' });
                            } else {
                                Usuario.findByIdAndUpdate(usuario._id, {'info_pago' : pagoSaved._id}, function (err, pagoUpdate) {
                                    if (err) {
                                        console.log(err)
                                        res.status(500).send({ message: 'Error al actualizar el campo.', error: err })
                                    } else {
                                        if (!pagoUpdate) {
                                            res.status(404).send({ message: 'No se encuentra el usuario.' });
                                        }
                                        else {
											                         res.status(200).send({ saved: pagoSaved })
                                        }
                                    }
                                });
                            }
                        }
                    });

                    //console.log(idusuario)
                }
            });
        }
      });
    } else {
        res.status(401).send({ auth: false, message: 'Token no provisto.' });
    }

}

function updatePago(req, res) {
    var token = req.params.token;

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.status(500).send({ auth: false, message: 'Erro al autenticar el token.' });
        } else {
            var usuarioId = decoded.id;

            var idValido = mongoose.Types.ObjectId.isValid(usuarioId);

            if (!idValido) {
                res.status(409).send({ message: 'Id no valido' });
            }
            else {
                /*Auto.findByIdAndUpdate(autoId, req.body, function (err, autoUpdate) {
                    if (err) {
                        console.log(err)
                        res.status(500).send({ message: 'Error al actualizar el campo.', error: err })
                    } else {
                        if (!autoUpdate) {
                            res.status(404).send({ message: 'No esta el auto compa.' });
                        }
                        else {
                            Auto.findById(autoId, function (err, autoNuevo) {
                                res.status(200).send({ viejo: autoUpdate, nuevo: autoNuevo })
                            });
                        }
                    }
                });*/
                var hashedCvv = bcrypt.hashSync(req.body.cvv.toString());
                req.body.cvv = hashedCvv;
                Pago.findOneAndUpdate({ 'usuario': usuarioId }, req.body, {new:true} ,function (err, pagoUpdate) {
                    if (err) {
                        console.log(err)
                        res.status(500).send({ message: 'Error al actualizar el campo.', error: err })
                    } else {
                        if (!pagoUpdate) {
                            res.status(404).send({ message: 'No esta la info del pago.' });
                        }else{
                            res.status(200).send({ data: pagoUpdate })
                        }
                    }
                });
            }
        }
      });
    } else {
        res.status(401).send({ auth: false, message: 'Token no provisto.' });
    }
}

function deletePago(req, res) {

  var token = req.body.token;

  if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
          res.status(500).send({ auth: false, message: 'Erro al autenticar el token.' });
      } else {
          var userId = decoded.id;

          var idValido = mongoose.Types.ObjectId.isValid(userId);

          if (!idValido) {
              res.status(409).send({ message: 'Id no valido' });
          }
          else {
              Pago.findOneAndDelete({ 'usuario': userId }, function(err,pago){
                  if (err) {
                      console.log(err)
                      res.status(500).send({ message: 'Error al eliminar el pago.', error: err })
                  }else{
                      if (!pago) {
                          res.status(404).send({ message: 'No se encuentra la info del pago.' });
                      }else{
                          res.status(200).send({ message: 'La informacion de pago ha sido eliminado' })
                      }
                  }
              });
          }
      }
    });
  } else {
      res.status(401).send({ auth: false, message: 'Token no provisto.' });
  }
}


module.exports = {
    prueba,
    getPago,
    savePago,
    updatePago,
    deletePago
}
