//US009
const RefeicaoService = require('../services/refeicaoService');

exports.listarRefeicoes = async function (req, res) {
    const refeicaoId = req.params.refeicaoId;
    const result = await RefeicaoService.getRefeicaoWithClientes(refeicaoId);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ error: 'Refeição não encontrada' });
    }
};
