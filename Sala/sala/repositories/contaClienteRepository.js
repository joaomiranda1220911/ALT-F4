const contaClienteModel = require('../models/contaCliente');

//US008 - Encomendar Prato
exports.getClienteById = async function (clienteId) {
    return await clienteModel.findOne({ _id: clienteId });
};

//US008 - Encomendar Prato
exports.atualizarSaldo = async function (clienteId, novoSaldo) {
    const conta = await contaClienteModel.findOne({ cliente: clienteId });
    if (!conta) return false;

    conta.saldo = novoSaldo;
    await conta.save();
    return true;
};
