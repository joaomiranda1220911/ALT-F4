const RefeicaoService = require('../services/refeicaoService');
const RefeicaoModel = require('../models/refeicao');

//US009: Listar Todas Refeições Servidas
exports.listarRefeicoesByData = async function (req, res) {
    const { data, tipoRefeicao } = req.params;
    console.log('[DEBUG] Chamando listarRefeicoesByData com:', req.params);

    // Valida se os parâmetros obrigatórios foram enviados
    if (!data || !tipoRefeicao) {
        return res.status(400).json({ error: 'Os campos data e tipoRefeicao são obrigatórios.' });
    }

    try {
        const dataFiltrada = new Date(data); // Formatar data
        console.log(`[DEBUG] Filtro data: ${dataFiltrada}, tipoRefeicao: ${tipoRefeicao}`);

        // Realizar a consulta
        const refeicoes = await RefeicaoModel.find({
            data: { $eq: dataFiltrada }, // Data exata
            tipoRefeicao: Number(tipoRefeicao) // Tipo de refeição
        });

        if (!refeicoes || refeicoes.length === 0) {
            console.log(`[INFO] Nenhuma refeição encontrada para a data ${data} e tipo ${tipoRefeicao}.`);
            return res.status(404).json({ error: 'Nenhuma refeição encontrada.' });
        }

        // Retornar resultados
        console.log(`[SUCESSO] Refeições encontradas: ${refeicoes.length}`);
        return res.status(200).json(refeicoes);
    } catch (error) {
        console.error(`[ERRO] Erro ao listar refeições: ${error.message}`);
        return res.status(500).json({ error: 'Erro ao listar refeições.' });
    }
};