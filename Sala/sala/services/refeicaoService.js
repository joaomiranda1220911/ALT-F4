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

// // Função para integrar o prato
// async function integrarPrato(idPrato, preco, emEmenta = true) {
//     try {
//         // Buscar o prato da API ASP.NET
//         const pratoData = await getPrato(idPrato);

//         if (!pratoData) {
//             throw new Error(`Prato com ID ${idPrato} não encontrado.`);
//         }

//         // Adiciona preço e ementa ao prato
//         pratoData.preco = preco;
//         pratoData.emEmenta = emEmenta;

//         // Salva o prato no banco de dados MongoDB
//         await salvarPrato(pratoData);
//         console.log("Prato integrado com sucesso!");
//     } catch (error) {
//         console.error("Erro no serviço de integração:", error.message);
//         throw error; // Lança o erro para ser tratado no Controller
//     }
// }

// module.exports = { integrarPrato };
