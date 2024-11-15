const PratoRepo = require('../repositories/pratoRepository');

exports.getEmentaDisponivel = async function () {
    const pratos = await PratoRepo.getPratosEmEmenta();

    return pratos.map(prato => ({
        id: prato._id,
        nome: prato.nome,
        preco: prato.preco
    }));
};
