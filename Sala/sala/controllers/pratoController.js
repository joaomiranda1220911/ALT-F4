const CozinhaService = require('../services/cozinhaService');

//US006: Definir prato
exports.definirPrecoPrato = async (req, res) => {
    const pratoId = req.params.id;  // Pegando o ID do prato
    const preco = req.body.preco;    // Pegando o preço do corpo da requisição

    console.log(`ID do prato: ${pratoId}`);
    console.log(`Preço: ${preco}`);

    try {
        // Chamando o serviço CozinhaService para buscar o prato
        const prato = await CozinhaService.getPratoById(pratoId);
        if (!prato) {
            return res.status(404).json({ error: 'Prato não encontrado.' });
        }

        // Atualizando o preço do prato
        prato.preco = preco;

        // Salvando as alterações no banco (se necessário)
        await prato.save();

        return res.status(200).json({ message: 'Preço atribuído com sucesso ao prato.' });
    } catch (error) {
        console.error('Erro ao definir preço:', error);
        return res.status(500).json({ error: 'Erro interno ao tentar definir o preço.' });
    }
};





