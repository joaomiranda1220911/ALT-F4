const EncomendaService = require('../services/encomendaService');

//US008 - Encomendar Prato
const mongoose = require('mongoose');

exports.createEncomenda = async function (req, res) {
    try {
        const encomenda = await EncomendaService.criarEncomenda(req.body);
        res.status(201).json({ message: 'Encomenda criada com sucesso!', encomenda });
    } catch (error) {
        console.error("Erro ao criar encomenda:", error.message);
        if (error.message === "Saldo insuficiente.") {
            res.status(400).json({ error: 'Saldo insuficiente para realizar a encomenda.' });
        } else {
            res.status(500).json({ error: 'Erro interno ao processar a encomenda.' });
        }
    }
};

// US010 - Listar Encomendas por Cliente
exports.listarEncomendasCliente = async function (req, res) {
    const clienteId = Number(req.params.clienteId);

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