const cozinhaService = require('../services/cozinhaService');
const pratoService = require('../services/pratoService');
const PratoModel = require('../models/prato');  

// US006: Definir preço de prato
exports.definirPrecoPrato = async (req, res) => {
    const IdPrato = parseInt(req.params.id);  // Garantir que o id é convertido para número
    const preco = req.body.preco;

    console.log(`[DEBUG] ID do prato recebido: ${IdPrato}`);
    console.log(`[DEBUG] Preço recebido: ${preco}`);

    // Validação do preço
    if (preco === undefined || preco === null || preco <= 0 || isNaN(preco)) {
        console.error(`[ERRO] Preço inválido: ${preco}`);
        return res.status(400).json({ error: 'Preço inválido. Deve ser um número positivo.' });
    }

    try {
        // Buscar o prato na base de dados .NET
        const pratoData = await cozinhaService.getPratoById(IdPrato);

        if (!pratoData) {
            console.error(`[ERRO] Prato com ID ${IdPrato} não encontrado na base de dados .NET.`);
            return res.status(404).json({ error: 'Prato não encontrado na base de dados .NET.' });
        }

        // Adicionar o preço ao prato recuperado da base de dados .NET
        const pratoMongo = new PratoModel({
            _id: IdPrato,  // ID do prato recuperado
            nome: pratoData.nome,  // Nome do prato
            tipoPrato: pratoData.tipoPrato || 'Tipo não especificado',  // Tipo de prato (caso esteja vazio, usa um valor padrão)
            ingredientes: pratoData.ingredientes || [],  // Ingredientes
            receita: pratoData.receita || 'Receita não especificada',  // Receita
            ativo: pratoData.ativo !== undefined ? pratoData.ativo : true,  // Verificar se o prato está ativo
            preco: preco  // Preço recebido da requisição
        });

        // Salvar o prato com o preço na base de dados MongoDB
        await pratoMongo.save();
        console.log(`[SUCESSO] Prato com ID ${IdPrato} e preço ${preco} salvo com sucesso no MongoDB.`);

        return res.status(200).json({ message: 'Preço atribuído e prato salvo com sucesso no MongoDB.', prato: pratoMongo });
    } catch (error) {
        console.error(`[ERRO] Erro ao definir preço: ${error.message}`);
        return res.status(500).json({ error: 'Erro ao tentar definir o preço e salvar o prato no MongoDB.' });
    }
};
