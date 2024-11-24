const transaction = require('../models/transaction');
const ClienteRepo = require('../repositories/clienteRepository');
const ClienteModel = require('../models/cliente');

//US001: Criar cliente
//Criar um novo cliente associando a conta com saldo inicial de 0€
exports.createCliente = async function (clienteDTO) {
    const newCliente = new ClienteModel({
        name: clienteDTO.name,
        nif: clienteDTO.nif,
        email: clienteDTO.email,
        account: {
            balance: 0, //Define saldo inicial como 0€
            transactions: [] //Inicializa a lista de transações vazias uma vez que ainda não foram realizadas transações
        }
    });
    return await ClienteRepo.createCliente(newCliente); //Chama o repository para salvar o cliente 
}

//US002: Listar todos os clientes
exports.getAllClientes = async function () {
    const allClientes = await ClienteRepo.getAllClientes();

    const clienteList = new Array();
    allClientes.forEach((cliente) => {
        clienteList.push({
            'name': cliente.name,
            'nif': cliente.nif,
            'email': cliente.email
        });
    });
    return clienteList;
}

//US003: Obter informação detalhada de um cliente
exports.getInfoClienteByNif = async function (clienteNif) {
    try {
        const theCliente = await ClienteRepo.getClienteByNif(clienteNif);

        if (theCliente === null) {
            return null;
        }
        else {
            var aux = {
                'name': theCliente.name,
                'nif': theCliente.nif,
                'email': theCliente.email,
                'balance': theCliente.account.balance.toFixed(2) + "€",
                'transactions': theCliente.account.transactions.map(transactions => ({
                    'id': transactions._id,
                    'type': transactions.type,
                    'amount': transactions.amount.toFixed(2) + "€",
                    'date': transactions.date.toLocaleString()
                }))
            };

            return aux;
        }
    } catch (error) {
        console.error('Erro ao encontrar cliente pelo NIF:', error);
        throw error;
    }
}

//US004: Obter informação do saldo de um cliente
exports.getSaldoByNif = async function (clienteNif){
    try{
        const saldo = await ClienteRepo.getClienteSaldoByNif(clienteNif);
        if (saldo === null){
            return null;
        }else{
            return saldo.toFixed(2) + "€";
        }
    }catch (error){
        console.error('Erro ao encontrar saldo do cliente através do NIF:', error);
        throw error;  
    }
};


// US005: Atualizar o saldo da conta de um cliente (carregar)
exports.carregarSaldo = async function (nif, valor) {
    try {
        const cliente = await ClienteRepo.updateSaldo(nif, valor);

        if (!cliente) {
            return 'Cliente com NIF ${nif} não encontrado.';
        }

        return 'Saldo atualizado com sucesso! Novo saldo: ${cliente.account.balance.toFixed(2)}€'; //2 casas decimais
    } catch (error) {
        console.error('Erro ao carregar saldo do cliente:', error);
        throw error; 
    }
};