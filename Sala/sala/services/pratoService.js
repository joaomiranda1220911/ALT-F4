const PratoModel = require('../models/prato');
const PratoRepo = require('../repositories/pratoRepository');

exports.createPrato = async function (pratoDTO) {
    // Criar um novo prato com os dados fornecidos no pratoDTO
    const newPrato = new PratoModel({
        nome: pratoDTO.nome,  // Nome do prato
        tipoPrato: pratoDTO.tipoPrato,  // Tipo de prato (ex: entrada, prato principal)
        ingredientes: pratoDTO.ingredientes,  // Lista de ingredientes (IDs dos ingredientes)
        receita: pratoDTO.receita || null,  // Receita (pode ser nulo)
        ativo: pratoDTO.ativo,  // Definir se o prato está ativo ou não
        preco: pratoDTO.preco || null  // Preço do prato (pode ser nulo)
    });

    // Chama o repositório para salvar o prato na base de dados
    return await PratoRepo.createPrato(newPrato);
}

//US006: Definir prato
exports.definirPrecoPrato = async (pratoId, preco) => {
    // Verifica se o prato existe usando o pratoId (do tipo número)
    const prato = await PratoModel.findOne({ where: { id: pratoId } });  // Aqui "id" é do tipo LONG

    if (prato) {
        prato.preco = preco;  // Atribui o novo preço
        await prato.save();    // Salva as alterações
        return prato;
    }
    return null;  // Caso não encontre o prato, retorna null
};


//US007: Consultar Ementa Disponível
exports.getEmentaDisponivel = async function () {
    try {
        console.log('A procurar pratos...');
        const pratos = await PratoRepo.getPratosEmEmenta();
        console.log('Pratos encontrados:', pratos);
        return pratos;
    } catch (error) {
        console.error('Erro ao obter a ementa:', error);
        throw error;
    }
};

