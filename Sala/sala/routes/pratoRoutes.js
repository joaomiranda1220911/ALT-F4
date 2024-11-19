var express = require('express');
var router = express.Router();

var {celebrate, Joi} = require('celebrate');

const ctr = require('../controllers/pratoController');

router.post('/', celebrate({
    body: Joi.object({
        nome: Joi.string().max(100).required(),
        tipoPrato: Joi.string().required(),
        ingredientes: Joi.array().items(Joi.string().required()),
        receita: Joi.string().allow(null),
        ativo: Joi.boolean().required(),
        preco: Joi.number().allow(null)
    })
}), ctr.createPrato);

// US006: Definir Prato
router.put('/prato/:id/preco', ctr.definirPrecoPrato);

// router.get('/', ctr.getAllPratos);

// router.get('/:id', ctr.getPratoByID);
// router.put('/:id', ctr.updatePratos);
// router.delete('/: id', ctr.deletePrato);

// router.put('/:id/assignrefeicao',
//     celebrate({
//         body: Joi.object({
//             assignedRefeicao:Joi.number().integer().min(1).required()
//         })
//     }),
// ctr.assignRefeicao);

module.exports = router;

