const RefeicaoModel = require('../models/refeicao');
const Prato = require('../models/prato'); // Modelo Mongoose do prato

exports.getRefeicaoById = async function (refeicaoId) {
    return await RefeicaoModel.findById(refeicaoId).populate('pratos');
};



// // Função para salvar o prato no MongoDB
// exports.salvarPrato = async function (pratoData) {
//     try {
//         const novoPrato = new Prato(pratoData); // Cria uma nova instância do prato com os dados
//         await novoPrato.save(); // Salva o prato no MongoDB
//         console.log("Prato salvo no banco de dados com sucesso!");
//     } catch (error) {
//         console.error("Erro ao salvar prato no MongoDB:", error.message);
//         throw error; // Lança o erro para ser tratado no serviço
//     }
// };
