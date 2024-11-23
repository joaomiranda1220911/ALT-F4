const express = require('express');
const router = express.Router();

var {celebrate, Joi} = require('celebrate');

const EncomendaController = require('../controllers/encomendaController');

//US008: Encomendar Prato
router.post('/encomendar', EncomendaController.createEncomenda);

//US010: Listar Encomendas por Cliente
router.get('/:clienteId', EncomendaController.listarEncomendasCliente);

module.exports = router;