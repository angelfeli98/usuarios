'use strict'
var Pago = require('../models/pago');
var Usuario = require('../models/usuario');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);


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
    /*
    var autoId = req.params.params.id;
    res.status(200).send({ data: autoId})
    */
    var usuario_nombre = req.params.nombre_usuario;



/*
        Usuario.findOne({'nombre_usuario' : usuario_nombre }, function (err, usuario) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al obtener el dato', error: err });
            } else {
                if (!usuario) {
                    res.status(404).send({ message: 'Este usuario no esta registrado.' });
                }
                else {
                    res.status(200).send({ usuario })
                }
            }
        });
*/

        Usuario.findOne({'nombre_usuario' : usuario_nombre}, function(req , usuario){
            Pago.populate(usuario , {path : "info_pago"}, function(err, usuario ){
                if (err) {
                    console.log(err)
                    res.status(500).send({ message: 'Error al obtenr datos.', error: err });
                }
                else {
                  if (!usuario) {
                      res.status(404).send({ message: 'Este usuario no esta registrado.' });
                  }
                  else {
                      res.status(200).send({ usuario })
                  }
                }
            });
        });


}


function saveUsuario(req, res) {
    /*
    var params = req.body;
    res.status(200).send({ metodo: "saveAuto", auto: params})
    */
    var usuario = new Usuario(req.body);

    usuario.save(function (err, usuarioSaved) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al registrar al usuario.', error: err });
        }
        else {
            res.status(200).send({ saved: usuarioSaved })
        }
    });

}

function updateUsuario(req, res) {
    /*
    var params = req.body;
    res.status(200).send({ metodo: "updateAuto", auto: params})
    */
    var usuario_nombre = req.params.nombre_usuario;
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
        Usuario.findOneAndUpdate({'nombre_usuario': usuario_nombre}, req.body, {new:true} ,function (err, usuarioUpdate) {
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al actualizar el campo.', error: err })
            } else {
                if (!usuarioUpdate) {
                    res.status(404).send({ message: 'No se encuentra el usuario.' });
                }else{
                    res.status(200).send({ data: usuarioUpdate })
                }
            }
        });


}

function deleteUsuario(req, res) {
    var usuario_nombre = req.params.nombre_usuario;

        /*model.findByIdAndRemove(autoIdr, function(err,auto){
            res.status(200).send({auto})
        });*/
        Usuario.findOneAndRemove({'nombre_usuario' : usuario_nombre}, function(err,usuario){
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al eliminar el usuario.', error: err })
            }else{
                if (!usuario) {
                    res.status(404).send({ message: 'No esta el usuario.' });
                }else{
                    res.status(200).send({ data: usuario })
                }
            }
        });

}


module.exports = {
    prueba,
    getUsuario,
    saveUsuario,
    updateUsuario,
    deleteUsuario
}
