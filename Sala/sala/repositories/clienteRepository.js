const ClienteModel = require('../models/cliente');

//US001: Criar cliente
//Criar um novo cliente na BD, associando uma conta com saldo inicial de 0€
exports.createCliente = async function (clienteData) {
    try {
        //cria uma nova instância do cliente com os dados recebidos
        const cliente = new ClienteModel(clienteData);//Criar cliente com dados recebidos
        await cliente.save(); //Guarda o cliente na BD
        return true; //Retorna true se o cliente for guardado com sucesso
    }
    catch (err) {
        return false; //Retorna falso caso tenha ocorrido algum erro
    }
};

//US002: Listar todos os clientes
exports.getAllClientes = async function () {
    try {
        return ClienteModel.find({});
    }
    catch (err) {
        return null;
    }
};

//US003: Obter informação detalhada de um cliente
exports.getClienteByNif = async function (clienteNif) {
    try {
        return await ClienteModel.findOne({ nif: clienteNif }).populate('account.transactions');
    } catch (error) {
        console.error("Erro ao encontrar cliente pelo NIF:", error);
        throw error;
    }
};

//US004: Obter informação do saldo de um cliente
exports.getClienteSaldoByNif = async function (clienteNif) {
    try {
        const cliente = await ClienteModel.findOne({ nif: clienteNif }).select('account.balance');
        return cliente ? cliente.account.balance : null; // Retornar o número puro
    } catch (error) {
        console.error("Erro ao obter saldo do cliente pelo NIF:", error);
        throw error;
    }
};

//US005: Atualizar o saldo da conta de um cliente
exports.carregarSaldo = async function (nif, valor) {
    try {
        const cliente = await ClienteModel.findOne({ nif });
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }

        cliente.account.balance += valor;
        await cliente.save();

        return cliente.account.balance;
    } catch (error) {
        console.error('Erro ao atualizar saldo:', error);
        throw error;
    }
};