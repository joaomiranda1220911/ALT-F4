const PratoService = require('../services/pratoService');

// US007 - Consultar Ementa Disponível
exports.getEmentaDisponivel = async function (req, res) {
    try {
        const ementa = await PratoService.getEmentaDisponivel();
        res.status(200).json(ementa);
    } catch (error) {
        console.error('Erro ao obter ementa:', error);
        res.status(500).json({ error: 'Erro interno ao tentar obter a ementa.' });
    }
};
