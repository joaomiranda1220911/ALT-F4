const RefeicaoModel = require('../models/refeicao');

//US009: Listar Todas Refeições Servidas
exports.getRefeicaoById = async function (refeicaoId) {
    return await RefeicaoModel.findById(refeicaoId).populate('pratos');
};
