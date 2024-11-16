const ClienteModel = require('../models/cliente');

//US001: Criar cliente
//Criar um novo cliente na BD, associando uma conta com saldo inicial de 0€
exports.createClient = async function (clienteData) {
    try {
        const cliente = new ClienteModel(clienteData);//Criar cliente com dados recebidos
        await cliente.save(); //Guarda o cliente na BD
        return true; //Retorna true se o cliente for guardado com sucesso
    }
    catch (err) {
        return false; //Retorna falso caso tenha ocorrido algum erro
    }
}