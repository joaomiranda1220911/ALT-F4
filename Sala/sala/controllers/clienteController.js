const ClienteService = require('../services/clienteService');

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
    try{
        const result = await ClienteService.getClienteByNif(req.params.nif);

        if (result === null) {
            res.status(404).json({ error: 'Cliente não existe.' });
        }else {
            res.status(200).json(result);
        }
    }catch(error){
        console.error('Erro ao obter a informação do cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

//US004: Obter informação do saldo de um cliente
exports.getClienteSaldo = async function (req, res){
    try{
        const saldo = await ClienteService.getSaldoByNif(req.params.nif);
        if(saldo === null){
            res.status(404).json({ error: 'Cliente não encontrado.' });
        } else{
            res.status(202).json({ balance: saldo });
        }
    } catch(error){
        console.error('Erro ao obter o saldo do cliente:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

//US005: Atualizar o saldo da conta de um cliente
exports.carregarContaCliente = async function (req, res) {
    const { nif, valor } = req.body; // Recebe o NIF e o valor a carregar

    const result = await ClienteService.carregarSaldo(nif, valor);

    // Verifica se ocorreu algum erro no Service
    if (result.error) {
        res.status(400).json({ error: result.error });
    } else {
        res.status(200).json(result);
    }
};
