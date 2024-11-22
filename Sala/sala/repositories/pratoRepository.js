const PratoModel = require('../models/prato');

//US006: Definir prato
exports.adicionarPreco = async function (idPrato, preco) {
    try {
        // Busca o prato pelo ID
        const prato = await PratoModel.findById(idPrato);

        if (!prato) {
            return false;  // Retorna falso se o prato não for encontrado
        }

        // Atribui o preço ao prato
        prato.preco = preco;

        // Atualiza o prato no banco de dados
        await prato.save();
        return true;
    } catch (err) {
        console.error(err);
        return false;  // Retorna falso em caso de erro
    }
};

// //US007: Consultar Ementa Disponível
// exports.getRefeicoesEmEmenta = async function () {
//     try {
//         // Acede aos pratos armazenados na base de dados
//         const refeicao = await Prato.find({ ativo: true }); // Query para pratos ativos
//         return pratos;
//     } catch (error) {
//         console.error('Erro ao obter pratos:', error);
//         throw error; // Lança o erro para ser tratado no controlador
//     }
// };