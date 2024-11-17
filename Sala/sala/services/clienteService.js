const transaction = require('../models/transaction');
const ClienteRepo = require('../repositories/clienteRepository');
const ClienteModel = require('../models/cliente');

//US001: Criar cliente
//Criar um novo cliente associando a conta com saldo inicial de 0€
exports.createClient = async function (clienteDTO) {
    const newCliente = new ClienteModel({
        name: clienteDTO.name,
        nif: clienteDTO.nif,
        email: clienteDTO.email,
        account: {
            balance: 0, //Define saldo inicial como 0€
            transactions: [] //Inicializa a lista de transações vazias uma vez que ainda não foram realizadas transações
        }
    });
    return await ClienteRepo.createCliente(newCliente);//Chama o repository para salvar o cliente 
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

exports.getClienteByNif = async function (clienteNif) {
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
                'transactions': theCliente.account.transactions.map(transaction => ({
                    'id': transaction._id,
                    'type': transaction.type,
                    'amount': transaction.amount.toFixed(2) + "€",
                    'date': transaction.date.toLocaleString()
                }))
            };

            return aux;
        }
    } catch (error) {
        console.error("Erro ao encontrar cliente pelo NIF:", error);
        throw error;
    }
}

// US005: Atualizar o saldo da conta de um cliente
exports.carregarSaldo = async function (nif, valor) {
    // Validação: o valor não pode ser negativo
    if (valor <= 0) {
        return { error: 'Erro no carregamento. O valor não pode ser negativo.' };
    }

    const clienteAtualizado = await ClienteRepo.updateSaldo(nif, valor);
    if (!clienteAtualizado) {
        return { error: 'Cliente não encontrado' };
    }

    return {
        message: `Saldo carregado com sucesso!`,
        cliente: {
            nome: clienteAtualizado.nome,
            nif: clienteAtualizado.nif,
            saldo: clienteAtualizado.saldo
        }
    };
};
