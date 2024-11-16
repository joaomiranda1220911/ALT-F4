var express = require('express');
var router = express.Router();

const clienteController = require('../controllers/clienteController');

//US001: Registar cliente
router.post('/', clienteController.createCliente); //Recebe dados para criar um novo cliente

module.exports = router;