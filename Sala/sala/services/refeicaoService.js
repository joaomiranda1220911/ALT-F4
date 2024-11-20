const RefeicaoRepo = require('../repositories/refeicaoRepository');

//US007: Consultar Ementa Disponível
exports.getEmentaDisponivel = async function () {
    try {
        console.log('A procurar refeições...');
        const refeicoes = await RefeicaoRepo.getRefeicoesEmEmenta();
        console.log('Refeições encontrados:', refeicoes);
        return refeicoes;
    } catch (error) {
        console.error('Erro ao obter a ementa:', error);
        throw error;
    }
};

//US009: Listar Todas Refeições Servidas
exports.getRefeicaoWithClientes = async function (refeicaoId) {
    return await RefeicaoRepo.getRefeicaoWithClientes(refeicaoId);
};

