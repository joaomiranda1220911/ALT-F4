const EncomendaService = require('../services/encomendaService');

exports.encomendarPrato = async function (req, res) {
    const { clienteId, pratoId } = req.body;

    const result = await EncomendaService.encomendarPrato(clienteId, pratoId);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(400).json({ error: result.message });
    }
};
