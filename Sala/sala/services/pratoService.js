const PratoModel = require('../models/prato');
const PratoRepo = require('../repositories/pratoRepository');

//US006: Definir prato
exports.definirPrecoPrato = async (pratoId, preco) => {
    // Verifica se o prato existe usando o pratoId (do tipo número)
    const prato = await PratoModel.findOne({ id: pratoId });  // Aqui "id" é do tipo LONG

    if (prato) {
        prato.preco = preco;  // Atribui o novo preço
        await prato.save();    // Salva as alterações
        return prato;
    }
    return null;  // Caso não encontre o prato, retorna null
};


