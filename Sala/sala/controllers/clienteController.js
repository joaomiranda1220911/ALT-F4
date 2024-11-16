const ClienteService = require('../services/clienteService');

//US001: Criar cliente
//Controla o processo de criação de um novo cliente chamando o serviço adequado
exports.createClient = async function (req, res){
    const result = await ClienteService.createClient(req.body); //Chamar o serviço para criar o cliente
    
    if (result == false){
        res.status(400).json({error:'Error creating or saving client'});//retorna erro se a criação falhar
    } else {
        res.status(201).json({message: 'Client created successfully'})//retorna sucesso
    }
}