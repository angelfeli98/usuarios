'use strict'

var Pago = require('../models/pago');
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

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
    var pagoId = req.params.id;

    var idValido = mongoose.Types.ObjectId.isValid(pagoId);

    if (!idValido) {
        res.status(409).send({ message: 'Id no valido' });
    }
    else {
        Pago.findById(pagoId, function (err, pago) {
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


function savePago(req, res) {
    /*
    var params = req.body;
    res.status(200).send({ metodo: "saveAuto", auto: params})
    */
    var pago = new Pago(req.body);

    pago.save(function (err, pagoSaved) {
        if (err) {
            console.log(err)
            res.status(500).send({ message: 'Error al guardar el pago.', error: err });
        }
        else {
            res.status(200).send({ saved: pagoSaved })
        }
    });

}

function updatePago(req, res) {
    /*
    var params = req.body;
    res.status(200).send({ metodo: "updateAuto", auto: params})
    */
    var pagoId = req.params.id;

    var idValido = mongoose.Types.ObjectId.isValid(pagoId);

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
        Pago.findByIdAndUpdate(pagoId, req.body, {new:true} ,function (err, pagoUpdate) {
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

function deletePago(req, res) {
    var pagoId = req.params.id;
    var idValidor = mongoose.Types.ObjectId.isValid(pagoId);

    if (!idValidor) {
        res.status(409).send({ message: 'Id no valido' });
    }
    else {
        /*model.findByIdAndRemove(autoIdr, function(err,auto){
            res.status(200).send({auto})
        });*/
        Pago.findByIdAndRemove(pagoId, function(err,pago){
            if (err) {
                console.log(err)
                res.status(500).send({ message: 'Error al actualizar el campo.', error: err })
            }else{
                if (!pago) {
                    res.status(404).send({ message: 'No se encuentra la info del pago.' });
                }else{
                    res.status(200).send({ data: pago })
                }
            }
        });
    }
}


module.exports = {
    prueba,
    getPago,
    savePago,
    updatePago,
    deletePago
}
