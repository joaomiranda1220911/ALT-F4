const RefeicaoService = require('../services/refeicaoService');

//US009: Listar Todas Refeições Servidas
exports.listarRefeicoes = async function (req, res) {
    const refeicaoId = req.params.refeicaoId;

    if (!refeicaoId) {
        return res.status(400).json({ error: 'ID da refeição é obrigatório' });
    }

    const result = await RefeicaoService.getRefeicaoWithClientes(refeicaoId);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ error: 'Refeição não encontrada' });
    }
};
