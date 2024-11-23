const EncomendaService = require('../services/encomendaService');
const mongoose = require('mongoose');

//US008 - Encomendar Prato
exports.createEncomenda = async function (req, res) {
    try {
        const encomenda = await EncomendaService.criarEncomenda(req.body);
        res.status(201).json({ message: 'Encomenda criada com sucesso!', encomenda });
    }

    catch (error) {
        console.error("Erro ao criar encomenda:", error.message);
        if (error.message === "Saldo insuficiente.") {
            res.status(400).json({ error: 'Saldo insuficiente para realizar a encomenda.' });
        }
        if (error.message === "Refeição sem stock.") {
            res.status(500).json({ error: 'Refeição sem stock.' });
        }
        if (error.message === "Valor da encomenda deve ser igual ou superior ao preço do prato") {
            res.status(500).json({ error: 'Valor da encomenda deve ser igual ou superior ao preço do prato.' });
        }
    }
};

// US010 - Listar Encomendas por Cliente
exports.listarEncomendasCliente = async function (req, res) {
    const clienteId = Number(req.params.clienteId); //  converte o valor para o tipo numérico de objectId

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