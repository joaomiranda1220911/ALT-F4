const EncomendaService = require('../services/encomendaService');

//US008 - Encomendar Prato
const mongoose = require('mongoose');

exports.encomendarPrato = async function (req, res) {
    try {
        const clienteId = req.body.clienteId;
        const pratoId = req.body.pratoId;

        // Validação: Certifica-te de que os IDs são números
        if (typeof clienteId !== 'number' || typeof pratoId !== 'number') {
            return res.status(400).json({ error: 'IDs inválidos. Deve ser um número.' });
        }

        const result = await EncomendaService.encomendarPrato(clienteId, pratoId);

        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(400).json({ error: result.message });
        }
    } catch (error) {
        console.error('Erro ao encomendar prato:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor.' });
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
