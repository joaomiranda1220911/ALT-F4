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
}

//US002: Listar todos os clientes
exports.getAllClientes = async function () {
    try {
        return ClienteModel.find({});
    }
    catch (err) {
        return null;
    }
}

//US003: Obter informação detalhada de um cliente
exports.getClienteByNif = async function (clienteNif) {
    try {
        return await ClienteModel.findOne({ nif: clienteNif }).populate('account.transactions');
    } catch (error) {
        console.error("Erro ao encontrar cliente pelo NIF:", error);
        throw error;
    }
}

// US005: Atualizar o saldo da conta de um cliente
exports.updateSaldo = async function (nif, valor) {
    try {
        const cliente = await ClienteModel.findOne({ nif: nif });
        if (!cliente) return null; // Cliente não encontrado

        cliente.saldo += valor; // Atualiza o saldo
        await cliente.save();
        return cliente; // Retorna o cliente atualizado
    } catch (err) {
        return null;
    }
};
