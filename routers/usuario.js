'use strict'

var express = require('express')

var usuarioController = require('../controllers/usuario')

var api = express.Router();

//api.get('/auto/:id?',autoController.prueba)

api.post('/loging',usuarioController.logingUsuario)
api.post('/usuario',usuarioController.saveUsuario)
api.get('/usuario/:token?',usuarioController.getUsuario)
api.put('/usuario/:token?',usuarioController.updateUsuario)
api.delete('/usuario/:token?',usuarioController.deleteUsuario)

module.exports = api;
