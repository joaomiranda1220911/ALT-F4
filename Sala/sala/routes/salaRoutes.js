const express = require('express');
const router = express.Router(); // Declara o router
 

var { celebrate, Joi } = require('celebrate');


//US007: Consultar Ementa Disponível
const EmentaController = require('../controllers/ementaController');
router.get('/ementa', EmentaController.getEmentaDisponivel);

//US009: Listar Todas Refeições Servidas
const RefeicaoController = require('../controllers/refeicaoController');
router.get('/refeicao/:refeicaoId', RefeicaoController.listarRefeicoesByData);


//Teste
router.get('/test', (req, res) => res.status(200).send('Servidor está ativo!'));

module.exports = router;
