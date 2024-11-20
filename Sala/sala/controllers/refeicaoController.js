const RefeicaoService = require('../services/refeicaoService');

//US009: Listar Todas Refeições Servidas
exports.listarRefeicoesByData = async function (req, res) {
    const refeicaoId = req.params.refeicaoId;
    const data = req.body.data;
    const tipoRefeicao = req.body.tipoRefeicao

    try {
        // Buscar o prato na base de dados .NET
        const pratoData = await cozinhaService.getRefeicaoById(refeicaoId);

        if (!pratoData) {
            console.error(`[ERRO] Refeição com ID ${refeicaoId} não encontrado na base de dados .NET.`);
            return res.status(404).json({ error: 'Refeição não encontrada na base de dados .NET.' });
        }

        // refeicao recuperado da base de dados .NET
        const refeicaoMongo = new RefeicaoModel({
            _id: refeicaoId,
            tipoRefeicao: refeicaoData.tipoRefeicao,
            data: refeicaoData.data,
            quantidadeProduzida: refeicaoData.quantidadeProduzida,
            idPrato: await pratoController.getPratoById(pratoData.prato),
        });

        // Salvar a refeicao com na base de dados MongoDB
        await refeicaoMongo.save();
        console.log(`[SUCESSO] Refeição com ID ${refeicaoId} salva com sucesso no MongoDB.`);

    } catch (error) {
        console.error(`[ERRO] Erro ao definir preço: ${error.message}`);
        return res.status(500).json({ error: 'Erro ao tentar definir o preço e salvar o prato no MongoDB.' });
    }

    const result = await RefeicaoService.getRefeicaoWithClientes(refeicaoId);

    if (result) {
        res.status(200).json(result);
    } else {
        res.status(404).json({ error: 'Refeição não encontrada' });
    }
}
