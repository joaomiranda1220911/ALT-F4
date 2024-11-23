const RefeicaoService = require('../services/refeicaoService');

// US007 - Consultar Ementa Disponível
exports.getEmentaDisponivel = async function (req, res) {
    const { data, tipoRefeicaoId } = req.params;

    if (!data || !tipoRefeicaoId) {
        return res.status(400).json({ error: 'Faltam parâmetros obrigatórios: data e tipoRefeicao.' });
    }

    try {
        // Converte os parâmetros
        const dataFormatada = new Date(data); // Converte para Date
        const tipoRefeicaoIdNumero = parseInt(tipoRefeicaoId); // Converte para número

        // Chama o serviço passando os parâmetros convertidos
        const ementa = await RefeicaoService.getRefeicoesEmEmenta(dataFormatada, tipoRefeicaoIdNumero);
        res.status(200).json(ementa);
    } catch (error) {
        console.error('Erro ao obter ementa:', error);
        res.status(500).json({ error: 'Erro interno ao tentar obter a ementa.' });
    }
};
