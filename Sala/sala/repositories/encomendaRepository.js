const EncomendaModel = require('../models/encomenda');

//US010 - Listar Encomendas por Cliente
exports.getEncomendasByClienteId = async function (clienteId) {
    return await EncomendaModel.find({ cliente: clienteId }).populate('refeicao');
};
