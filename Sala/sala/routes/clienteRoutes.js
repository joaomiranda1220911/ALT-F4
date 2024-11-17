var express = require('express');
var router = express.Router();

const clienteController = require('../controllers/clienteController');

//US001: Registar cliente
router.post('/', clienteController.createClient); //Recebe dados para criar um novo cliente

//US003: Obter informação detalhada de um cliente
router.get('/cliente/:nif', clienteController.getCliente);

module.exports = router;

