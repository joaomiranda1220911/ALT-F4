var express = require('express');
var router = express.Router();

var {celebrate, Joi} = require('celebrate');

const EmentaController = require('../controllers/ementaController');
const RefeicaoController = require('../controllers/refeicaoController');
// const pratoController = require('../controllers/pratoController');

// // US006: Definir Prato
// router.put('/prato/:id/preco', pratoController.definirPrecoPrato);

//US007: Consultar Ementa Disponível
router.get('/ementa', EmentaController.getEmentaDisponivel);

//US009: Listar Todas Refeições Servidas
router.get('/refeicoes/:refeicaoId', RefeicaoController.listarRefeicoes);


//Teste
router.get('/test', (req, res) => res.status(200).send('Servidor está ativo!'));

module.exports = router;
