const express = require('express');
const router = express.Router();

const EmentaController = require('../controllers/ementaController');
const EncomendaController = require('../controllers/encomendaController');
const RefeicaoController = require('../controllers/refeicaoController');

//US007: Consultar Ementa Disponível
router.get('/ementa', EmentaController.getEmentaDisponivel);

//US008: Encomendar Prato
router.post('/encomendas', EncomendaController.encomendarPrato);

//US009: Listar Todas Refeições Servidas
router.get('/refeicoes/:refeicaoId', RefeicaoController.listarRefeicoes);

//US010: Listar Encomendas por Cliente
router.get('/clientes/:clienteId/encomendas', EncomendaController.listarEncomendasCliente);

module.exports = router;
