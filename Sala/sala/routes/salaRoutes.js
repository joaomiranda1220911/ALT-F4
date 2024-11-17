const express = require('express');
const router = express.Router();

const EmentaController = require('../controllers/ementaController');
const EncomendaController = require('../controllers/encomendaController');
const RefeicaoController = require('../controllers/refeicaoController');

router.get('/ementa', EmentaController.getEmentaDisponivel);
router.post('/encomendas', EncomendaController.encomendarPrato);
//US009
router.get('/refeicoes/:refeicaoId', RefeicaoController.listarRefeicoes);
//US010
router.get('/clientes/:clienteId/encomendas', EncomendaController.listarEncomendasCliente);

module.exports = router;
