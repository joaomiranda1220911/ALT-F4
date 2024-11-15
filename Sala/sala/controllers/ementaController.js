const PratoService = require('../services/pratoService');

exports.getEmentaDisponivel = async function (req, res) {
    const ementa = await PratoService.getEmentaDisponivel();
    res.status(200).json(ementa);
};
