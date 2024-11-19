const PratoModel = require('../models/prato');

exports.createPrato = async function (thePrato) {
    try {
        await thePrato.save();
        return true;
    }
    catch (err) {
        return false;
    }
}

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

//US007: Consultar Ementa Disponível
const Prato = require('../models/prato'); 
// Função que retorna os pratos disponíveis na ementa
exports.getPratosEmEmenta = async function () {
    try {
        // Acede aos pratos armazenados na base de dados
        const pratos = await Prato.find({ ativo: true }); // Query para pratos ativos
        return pratos;
    } catch (error) {
        console.error('Erro ao obter pratos:', error);
        throw error; // Lança o erro para ser tratado no controlador
    }
};

//US007: Consultar Ementa Disponível
exports.decrementarQuantidadePrato = async function (pratoId) {
    const prato = await PratoModel.findById(pratoId);
    if (!prato || prato.quantidade <= 0) return false;

    prato.quantidade -= 1;
    await prato.save();
    return true;
};