const PratoModel = require('../models/prato');
const PratoRepo = require('../repositories/pratoRepository');

//US006: Definir prato
exports.definirPrecoPrato = async (pratoId, preco) => {
    const prato = await PratoModel.findOne({ id: pratoId });  // findOne encontra um único documento com base no critério de pesquisa

    if (prato) {
        prato.preco = preco;  // Atribui o novo preço
        await prato.save();    // Salva as alterações
        return prato;
    }
    return null;  // Caso não encontre o prato, retorna null
};
