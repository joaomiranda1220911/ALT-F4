const EncomendaModel = require('../models/encomenda');
exports.getEncomendasByClienteId = async function (clienteId) {
    return await EncomendaModel.find({ cliente: clienteId }).populate('refeicao');
};
