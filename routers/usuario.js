'use strict'

var express = require('express')

var usuarioController = require('../controllers/usuario')

var api = express.Router();

//api.get('/auto/:id?',autoController.prueba)

api.get('/usuario/:nombre_usuario?',usuarioController.getUsuario)
api.post('/usuario',usuarioController.saveUsuario)
api.put('/usuario/:nombre_usuario?',usuarioController.updateUsuario)
api.delete('/usuario/:nombre_usuario?',usuarioController.deleteUsuario)

module.exports = api;
