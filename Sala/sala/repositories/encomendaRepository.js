const EncomendaModel = require('../models/encomenda');

//US010 - Listar Encomendas por Cliente
exports.getEncomendasByClienteId = async function (clienteId) {
    return await EncomendaModel.find({ cliente: clienteId })
        .populate({
            path: 'refeicao',
            populate: {
                path: 'pratos', // Faz o populate dos pratos associados à refeição
                select: 'nome preco' // Seleciona os campos necessários de Prato
            }
        });
};
