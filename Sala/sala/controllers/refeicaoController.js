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

// // Rota para integrar prato
// router.post('/integrarPrato/:idPrato', async (req, res) => {
//     try {
//         const { idPrato } = req.params; // Captura o idPrato da URL
//         const { preco, emEmenta = true } = req.body; // Captura o preço do corpo da requisição

//         // Validação do preço
//         if (preco < 0) {
//             return res.status(400).json({ erro: 'Erro no carregamento. O valor não pode ser negativo.' });
//         }

//         // Chama o serviço para integrar o prato
//         await integrarPrato(idPrato, preco, emEmenta);

//         // Resposta de sucesso
//         res.status(200).json({ mensagem: 'Prato integrado com sucesso!' });
//     } catch (error) {
//         // Erro de servidor
//         res.status(500).json({ erro: error.message });
//     }
// });

// module.exports = router;