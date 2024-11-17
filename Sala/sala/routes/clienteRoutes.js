var express = require('express');
var router = express.Router();

const clienteController = require('../controllers/clienteController');

//US001: Registar cliente
router.post('/', clienteController.createCliente); //Recebe dados para criar um novo cliente

//US002: Listar todos os clientes
router.get('/', clienteController.getAllClientes); //Recupera todos os clientes existentes

//US003: Obter informação detalhada de um cliente
router.get('/cliente/:nif', clienteController.getCliente);

module.exports = router;

