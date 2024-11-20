const RefeicaoService = require('../services/refeicaoService');
const RefeicaoModel = require('../models/refeicao');

//US009: Listar Todas Refeições Servidas
exports.listarRefeicoesByData = async function (req, res) {
    const { data, tipoRefeicao } = req.body; // Desestruturação dos filtros enviados pelo cliente

    // Validação inicial para garantir que os filtros estão presentes
    if (!data || !tipoRefeicao) {
        return res.status(400).json({ error: 'Os campos data e tipoRefeicao são obrigatórios.' });
    }

    try {
        // Converter a data para o formato correto
        const dataFiltrada = new Date(data);

        // Buscar refeições no MongoDB que correspondam à data e ao tipo
        const refeicoes = await RefeicaoModel.find({
            data: { $eq: dataFiltrada }, // Verifica igualdade exata da data
            tipoRefeicao: { $eq: tipoRefeicao } // Verifica igualdade do tipo
        });

        // Verificar se há resultados
        if (!refeicoes || refeicoes.length === 0) {
            console.log(`[INFO] Nenhuma refeição encontrada para a data ${data} e tipo ${tipoRefeicao}.`);
            return res.status(404).json({ error: 'Nenhuma refeição encontrada para os critérios especificados.' });
        }

        // Responder com as refeições encontradas
        console.log(`[SUCESSO] Encontradas ${refeicoes.length} refeições para os critérios especificados.`);
        return res.status(200).json(refeicoes);
    } catch (error) {
        // Log de erro e resposta apropriada
        console.error(`[ERRO] Erro ao listar refeições: ${error.message}`);
        return res.status(500).json({ error: 'Erro ao listar refeições.' });
    }
};