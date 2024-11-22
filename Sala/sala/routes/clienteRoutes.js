var express = require('express');
var router = express.Router();

var {celebrate, Joi} = require('celebrate');

const clienteController = require('../controllers/clienteController');

//US001: Registar cliente
router.post('/', clienteController.createCliente);//Recebe dados para criar um novo cliente

//US002: Listar todos os clientes
router.get('/', clienteController.getAllClientes); //Recupera todos os clientes existentes

//US003: Obter informação detalhada de um cliente
router.get('/cliente/:nif', clienteController.getCliente);

//US004: Obter informação do saldo de um cliente
router.get('/cliente/:nif/saldo', clienteController.getClienteSaldo);

//US005: US005: Atualizar o saldo da conta de um cliente
router.patch('/:nif/carregar', clienteController.carregarSaldo);

module.exports = router;

