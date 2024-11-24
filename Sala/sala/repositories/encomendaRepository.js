const EncomendaModel = require('../models/encomenda');

//US008 - Encomendar Refeicao
exports.createEncomenda = async function (encomendaData) {
    try {
        const encomenda = new EncomendaModel(encomendaData);
        await encomenda.save();
        return encomenda;
    } catch (error) {
        console.error("Erro ao criar encomenda:", error);
        throw error;
    }
};

//US010 - Listar Encomendas por Cliente
exports.getEncomendasByClienteId = async function (clienteId) {
    return await EncomendaModel.find({ cliente: clienteId })
        .populate({
            path: 'refeicao',
            populate: {
                path: 'pratos', // Faz o populate dos pratos associados à refeição
                select: 'nome preco' // Seleciona os campos do Prato que sao necessarios - nome e preço
            }
        });
};