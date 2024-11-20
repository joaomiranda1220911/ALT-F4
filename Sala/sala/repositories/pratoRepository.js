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