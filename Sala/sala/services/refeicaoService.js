const RefeicaoRepo = require('../repositories/refeicaoRepository');

//US009: Listar Todas Refeições Servidas
exports.getRefeicaoWithClientes = async function (refeicaoId) {
    return await RefeicaoRepo.getRefeicaoWithClientes(refeicaoId);
};

