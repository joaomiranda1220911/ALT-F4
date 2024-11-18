const express = require('express');
const router = express.Router();

const EmentaController = require('../controllers/ementaController');
const EncomendaController = require('../controllers/encomendaController');
const RefeicaoController = require('../controllers/refeicaoController');
const pratoController = require('../controllers/pratoController');

// US006: Definir Prato
router.put('/prato/:id/preco', pratoController.definirPrecoPrato);

//US007: Consultar Ementa Disponível
router.get('/ementa', EmentaController.getEmentaDisponivel);

//US008: Encomendar Prato
router.post('/encomendas', EncomendaController.encomendarPrato);

//US009: Listar Todas Refeições Servidas
router.get('/refeicoes/:refeicaoId', RefeicaoController.listarRefeicoes);

//US010: Listar Encomendas por Cliente
router.get('/clientes/:clienteId/encomendas', EncomendaController.listarEncomendasCliente);

//Teste
router.get('/test', (req, res) => res.status(200).send('Servidor está ativo!'));

module.exports = router;
