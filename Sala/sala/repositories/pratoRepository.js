const PratoModel = require('../models/prato');

//US007: Consultar Ementa Disponível
exports.getPratosEmEmenta = async function () {
    return await PratoModel.find({ emEmenta: true, quantidade: { $gt: 0 } });
};

//US007: Consultar Ementa Disponível
exports.decrementarQuantidadePrato = async function (pratoId) {
    const prato = await PratoModel.findById(pratoId);
    if (!prato || prato.quantidade <= 0) return false;

    prato.quantidade -= 1;
    await prato.save();
    return true;
};