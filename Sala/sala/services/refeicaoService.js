const RefeicaoRepo = require('../repositories/refeicaoRepository');

//US009: Listar Todas Refeições Servidas
exports.getRefeicaoWithClientes = async function (refeicaoId) {
    const refeicao = await RefeicaoRepo.getRefeicaoById(refeicaoId);
    if (!refeicao) return null;
    return {
        tipo: refeicao.tipo,
        pratos: refeicao.pratos.map(prato => ({
            pratoNome: prato.nome,
            clienteNome: prato.clienteNome
        }))
    };
};
