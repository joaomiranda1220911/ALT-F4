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

//US007: Consultar Ementa Disponível
exports.getPratosEmEmenta = async function () {
    return await PratoModel.find({ emEmenta: true, quantidade: { $gt: 0 } });
};

//US007: Consultar Ementa Disponível
exports.decrementarQuantidadePrato = async function (pratoId) {
    const prato = await PratoModel.findById(pratoId);
    if (!prato || prato.quantidade <= 0) return false;

    prato.quantidade -= 1;
    await prato.save();
    return true;
};