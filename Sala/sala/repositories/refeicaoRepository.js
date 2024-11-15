const RefeicaoModel = require('../models/refeicao');

exports.getRefeicaoById = async function (refeicaoId) {
    return await RefeicaoModel.findById(refeicaoId).populate('pratos');
};
