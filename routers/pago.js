'use strict'

var express = require('express')

var pagoController = require('../controllers/pago')

var api = express.Router();

//api.get('/auto/:id?',autoController.prueba)

api.get('/usuario/pago/:id?',pagoController.getPago)
api.post('/usuario/pago',pagoController.savePago)
api.put('/usuario/pago/:id?',pagoController.updatePago)
api.delete('/usuario/pago/:id?',pagoController.deletePago)

module.exports = api;
