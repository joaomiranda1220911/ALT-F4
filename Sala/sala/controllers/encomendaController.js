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

// US010 - Listar Encomendas por Cliente
exports.listarEncomendasCliente = async function (req, res) {
    const clienteId = req.params.clienteId;

    try {
        const result = await EncomendaService.getEncomendasByCliente(clienteId);

        if (result == null) {
            res.status(404).json({ error: 'Nenhuma encomenda encontrada para este cliente.' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error('Erro ao listar encomendas do cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
