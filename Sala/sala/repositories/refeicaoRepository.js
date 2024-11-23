const RefeicaoModel = require('../models/refeicao');
const PratoModel = require('../models/prato');
const EncomendaModel = require('../models/encomenda');

//US007: Consultar Ementa Disponível
exports.getRefeicoesEmEmenta = async function (data, tipoRefeicaoId) {
       console.log('[DEBUG] Chamando getRefeicoesEmEmenta com parâmetros:', data, tipoRefeicaoId);
    try {
        // Obter os pratos ativos
        const pratosAtivos = await PratoModel.find({ ativo: true }).select('_id'); // IDs dos pratos ativos

        if (pratosAtivos.length === 0) {
            console.log('Nenhum prato ativo encontrado.');
            return [];
        }

        // Filtra as refeições pela data e tipo de refeição
        const refeicoes = await RefeicaoModel.find({
            data: { $eq: new Date(data) }, 
            tipoRefeicao: Number(tipoRefeicaoId),
            pratos: { $in: pratosAtivos.map(prato => prato._id) }
        });

        console.log('Data formatada na consulta:', new Date(data));
        return refeicoes;
    } catch (error) {
        console.error('Erro ao obter refeições:', error);
        throw error;
    }
};

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
    
    if (refeicao && refeicao.quantidadeProduzida > 0) {
        refeicao.quantidadeProduzida -= 1; // Decrementa 1 unidade
        await refeicao.save();
        return true; // Retorna true caso a quantidade tenha sido decrementada
    } else {
        return false; // Retorna false caso não haja stock disponível
    }
};

