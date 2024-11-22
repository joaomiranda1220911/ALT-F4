const ClienteService = require('../services/clienteService');
const ClienteRepo = require('../repositories/clienteRepository');
const ClienteModel = require('../models/cliente');

//US001: Criar cliente
exports.createCliente = async function (req, res) {
    const result = await ClienteService.createCliente(req.body); //Chamar o serviço para criar o cliente

    if (result == false) {
        res.status(400).json({ error: 'Erro a criar ou a guardar o cliente.' });//retorna erro se a criação falhar
    } else {
        res.status(201).json({ message: 'Cliente criado com sucesso.' })//retorna sucesso
    }
};

//US002: Listar todos os clientes
exports.getAllClientes = async function (req, res) {
    const result = await ClienteService.getAllClientes(); //Chama o serviço para obter todos os clientes

    if (result === null) {
        res.status(404).json({ error: 'Cliente não existe.' });//Caso haja erro na recuperação
    }
    else {
        res.status(200).json(result);//retorna a lista de todos os clientes
    }
};

//US003: Obter informação detalhada de um cliente
exports.getCliente = async function (req, res) {
    const result = await ClienteService.getInfoClienteByNif(req.params.nif);
    if (result === null) {
        res.status(404).json({ error: 'Cliente não existe.' });
    }
    else{
        res.status(200).json(result);
    }
};

//US004: Obter informação do saldo de um cliente
exports.getClienteSaldo = async function (req, res){
    try{
        const saldo = await ClienteService.getSaldoByNif(req.params.nif);
        if(saldo === null){
            res.status(404).json({ error: 'Cliente não encontrado.' });
        } else{
            res.status(200).json({ balance: saldo });
        }
    } catch(error){
        console.error('Erro ao obter o saldo do cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// US005: Carregar saldo de um cliente através do NIF
exports.carregarSaldo = async (req, res) => {
    try {
        const { nif } = req.params; // NIF do cliente, por exemplo
        const { valor } = req.body; // Valor a ser carregado no saldo

        // Buscar o cliente pelo NIF
        const cliente = await ClienteModel.findOne({ nif: nif });

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        // Atualizar o saldo
        cliente.account.balance += valor; // Acrescentar o valor ao saldo

        await ClienteModel.updateOne(
            { nif: nif }, // critério de busca
            { $inc: { "account.balance": valor } } // Atualiza o saldo
        );

        res.status(200).json({ message: 'Saldo atualizado com sucesso', cliente });
    } catch (err) {
        console.error('Erro ao carregar saldo:', err);
        res.status(500).json({ message: 'Erro ao carregar saldo', error: err.message });
    }
};
