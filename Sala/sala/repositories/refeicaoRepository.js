const RefeicaoModel = require('../models/refeicao');
const EncomendaModel = require('../models/encomenda');


//US009: Listar Todas Refeições Servidas
exports.getRefeicaoWithClientes = async function (refeicaoId) {
    const refeicao = await RefeicaoModel.findById(refeicaoId).populate('pratos');
    if (!refeicao) return null;

    const encomendas = await EncomendaModel.find({ refeicao: refeicaoId }).populate('cliente');

    return {
        tipo: refeicao.tipo,
        pratos: refeicao.pratos.map(prato => prato.nome),
        clientes: encomendas.map(encomenda => ({
            nome: encomenda.cliente.name,
        }))
    };
};

//US008: Encomendar refeicao
exports.decrementarQuantidadeRefeicao = async function (refeicaoId) {
    const refeicao = await RefeicaoModel.findById(refeicaoId);
    if (!refeicao || refeicao.quantidadeProduzida <= 0) return false;

    refeicao.quantidadeProduzida -= 1;
    await refeicao.save();
    return true;
};
