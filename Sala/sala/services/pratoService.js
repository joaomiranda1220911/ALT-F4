const PratoModel = require('../models/prato');

//US006: Definir prato
exports.definirPrecoPrato = async (pratoId, preco) => {
    // Verifica se o prato existe usando o pratoId (do tipo número)
    const prato = await PratoModel.findOne({ where: { id: pratoId } });  // Aqui "id" é do tipo LONG

    if (prato) {
        prato.preco = preco;  // Atribui o novo preço
        await prato.save();    // Salva as alterações
        return prato;
    }
    return null;  // Caso não encontre o prato, retorna null
};


//US007: Consultar Ementa Disponível
exports.getEmentaDisponivel = async function () {
    const pratos = await PratoRepo.getPratosEmEmenta();

    return pratos.map(prato => ({
        id: prato._id,
        nome: prato.nome,
        preco: prato.preco
    }));
};
