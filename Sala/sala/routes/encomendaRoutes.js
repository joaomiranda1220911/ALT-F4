const express = require('express');
const router = express.Router();

var {celebrate, Joi} = require('celebrate');

const EncomendaController = require('../controllers/encomendaController');

//US008: Encomendar Prato
// POST - Criar uma encomenda
router.post('/', EncomendaController.createEncomenda);

//US010: Listar Encomendas por Cliente
router.get('/clientes/:clienteId/encomendas', EncomendaController.listarEncomendasCliente);

module.exports = router;