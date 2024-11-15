const PratoModel = require('../models/prato');

exports.getPratosEmEmenta = async function () {
    return await PratoModel.find({ emEmenta: true, quantidade: { $gt: 0 } });
};

exports.decrementarQuantidadePrato = async function (pratoId) {
    const prato = await PratoModel.findById(pratoId);
    if (!prato || prato.quantidade <= 0) return false;

    prato.quantidade -= 1;
    await prato.save();
    return true;
};