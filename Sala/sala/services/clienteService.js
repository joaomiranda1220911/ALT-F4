const ClienteRepo = require('../repositories/clienteRepository');
const ClienteModel = required('../models/cliente');

//US001: Criar cliente
//Criar um novo cliente associando a conta com saldo inicial de 0€
exports.createClient = async function (clienteDTO){
    const newCliente = new ClienteModel({
        name: clienteDTO.name,
        nif: clienteDTO.nif,
        email: clienteDTO.email,
        account: {
            balance: 0, //Define saldo inicial como 0€
            transactions: [] //Inicializa a lista de transações vazias uma vez que ainda não foram realizadas transações
        }
    });
    return await ClienteRepo.createClient(newCliente);//Chama o repository para salvar o cliente 
}

//US003: Obter informação detalhada de um cliente

exports.getClienteByNif = async function (clienteNif) {
    try{
    const theCliente = await ClienteRepo.getClienteByNif(clienteNif);

    if(theCliente === null){
        return null;
    }
    else{
        var aux = {
            'name': theCliente.name,
            'nif': theCliente.nif,
            'email': theCliente.email,
            'balance': theCliente.balance.toFixed(2) + "€"
        };

        return aux;
    }
    } catch(error){
        console.error("Erro ao encontrar cliente pelo NIF:", error);
        throw error;
    }
}
