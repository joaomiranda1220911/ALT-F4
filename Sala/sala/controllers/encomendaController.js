const EncomendaService = require('../services/encomendaService');

//US008 - Encomendar Prato
exports.encomendarPrato = async function (req, res) {
    const { clienteId, pratoId } = req.body;

    const result = await EncomendaService.encomendarPrato(clienteId, pratoId);
    if (result.success) {
        res.status(201).json({ message: result.message });
    } else {
        res.status(400).json({ error: result.message });
    }
};

//US010 - Listar Encomendas por Cliente
exports.listarEncomendasCliente = async function (req, res) {
    const clienteId = req.params.clienteId;
    const result = await EncomendaService.getEncomendasByCliente(clienteId);
    res.status(200).json(result);
};

