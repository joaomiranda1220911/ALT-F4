const RefeicaoModel = require('../models/refeicao');
const Prato = require('../models/prato'); // Modelo Mongoose do prato

//US009: Listar Todas Refeições Servidas
exports.getRefeicaoById = async function (refeicaoId) {
    return await RefeicaoModel.findById(refeicaoId).populate('pratos');
};



