'use strict'

var express = require('express')

var pagoController = require('../controllers/pago')

var api = express.Router();

//api.get('/auto/:id?',autoController.prueba)

api.get('/usuario/pago/:token?',pagoController.getPago)
api.post('/usuario/pago/:token?',pagoController.savePago)
api.put('/usuario/pago/:token?',pagoController.updatePago)
api.delete('/delete/pago',pagoController.deletePago)

module.exports = api;
