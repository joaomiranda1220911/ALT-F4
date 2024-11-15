const contaClienteModel = require('../models/contaCliente');

exports.getclienteById = async function (clienteId) {
    return await contaClienteModel.findOne({ cliente: clienteId });
};

exports.atualizarSaldo = async function (clienteId, novoSaldo) {
    const conta = await contaClienteModel.findOne({ cliente: clienteId });
    if (!conta) return false;

    conta.saldo = novoSaldo;
    await conta.save();
    return true;
};
