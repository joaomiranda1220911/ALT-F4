var express = require('express');
var router = express.Router();

const ctr = require('../controllers/pratoController');

// US006: Definir Prato
router.put('/:id/preco', ctr.definirPrecoPrato);

module.exports = router;