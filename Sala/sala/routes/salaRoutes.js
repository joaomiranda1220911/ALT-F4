const express = require('express');
const router = express.Router();

const EmentaController = require('../controllers/ementaController');
const EncomendaController = require('../controllers/encomendaController');

router.get('/ementa', EmentaController.getEmentaDisponivel);
router.post('/encomendas', EncomendaController.encomendarPrato);

module.exports = router;
