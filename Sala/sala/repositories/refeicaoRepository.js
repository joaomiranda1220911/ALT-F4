const RefeicaoModel = require('../models/refeicao');
const EncomendaModel = require('../models/encomenda');

// //US007: Consultar Ementa Disponível
// // Função que retorna as refeicoes disponíveis na ementa
// exports.getRefeicoesEmEmenta = async function () {
//     try {
//         // Obter os pratos ativos
//         const pratosAtivos = await Prato.find({ ativo: true }).select('_id'); // Retorna apenas os IDs dos pratos

//         // Se não existirem pratos ativos, retorna lista vazia
//         if (pratosAtivos.length === 0) {
//             console.log('Nenhum prato ativo encontrado.');
//             return [];
//         }

//         // Obter as refeições associadas aos pratos ativos
//         const refeicoes = await Refeicao.find({ idPrato: { $in: pratosAtivos.map(prato => prato._id) } });

//         return refeicoes;
//     } catch (error) {
//         console.error('Erro ao obter refeições:', error);
//         throw error; // Lança o erro para ser tratado no controlador
//     }
// };



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
