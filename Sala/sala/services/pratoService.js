const PratoModel = require('../models/prato');
const PratoRepo = require('../repositories/pratoRepository');

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
    try {
        console.log('A procurar pratos...');
        const pratos = await PratoRepo.getPratosEmEmenta();
        console.log('Pratos encontrados:', pratos);
        return pratos;
    } catch (error) {
        console.error('Erro ao obter a ementa:', error);
        throw error;
    }
};

