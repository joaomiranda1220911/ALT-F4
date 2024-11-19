const CozinhaService = require('../services/cozinhaService');
const pratoService = require('../services/pratoService');

exports.createPrato= async function (req, res) {
    const result = await pratoService.createPrato(req.body);

    if (result == false) {
        res.status(400).json({ error: 'Error creating or saving prato' });

    }

    else {
        res.status(201).json({ message: 'Prato created successfully' });
    }
}

// US006: Definir prato
exports.definirPrecoPrato = async (req, res) => {
    const IdPrato = req.params.id; // ID do prato vindo da rota
    const preco = req.body.preco; // Preço enviado no corpo da requisição

    console.log(`[DEBUG] ID do prato recebido: ${IdPrato}`);
    console.log(`[DEBUG] Preço recebido: ${preco}`);

    // Validação do preço
    if (preco === undefined || preco === null || preco <= 0 || isNaN(preco)) {
        console.error(`[ERRO] Preço inválido: ${preco}`);
        return res.status(400).json({ error: 'Preço inválido. Deve ser um número positivo.' });
    }

    try {
        // Remover a validação do ObjectId, caso o ID seja numérico
        if (isNaN(IdPrato)) {
            console.error(`[ERRO] ID inválido: ${IdPrato}`);
            return res.status(400).json({ error: 'ID do prato inválido.' });
        }


        // Chamando o serviço para buscar o prato na API .NET
        const prato = await CozinhaService.getPratoById(IdPrato);
        if (!prato) {
            console.error(`[ERRO] Prato com ID ${IdPrato} não encontrado na API .NET.`);
            return res.status(404).json({ error: 'Prato não encontrado.' });
        }

        // Atualizando o preço do prato
        prato.preco = preco;

        console.log(`[SUCESSO] Preço de ${preco} atribuído ao prato com ID ${IdPrato}.`);
        return res.status(200).json({ message: 'Preço atribuído com sucesso ao prato.', prato });
    } catch (error) {
        console.error(`[ERRO] Erro ao definir preço: ${error.message}`);
        return res.status(500).json({ error: 'Erro interno ao tentar definir o preço.' });
    }
};
