const PratoService = require('../services/pratoService');

// US007 - Consultar Ementa Disponível
exports.getEmentaDisponivel = async function (req, res) {
    const ementa = await PratoService.getEmentaDisponivel();
    res.status(200).json(ementa);
};
