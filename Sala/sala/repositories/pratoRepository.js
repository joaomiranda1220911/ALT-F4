const PratoModel = require('../models/prato');
const RefeicaoModel = require('../models/refeicao');

//US006: Definir prato
exports.adicionarPreco = async function (idPrato, preco) {
    try {
        // Busca o prato pelo ID
        const prato = await PratoModel.findById(idPrato);

        if (!prato) {
            return false;  // Retorna falso se o prato não for encontrado
        }

        // Atribui o preço ao prato
        prato.preco = preco;

        // Atualiza o prato no banco de dados
        await prato.save();
        return true;
    } catch (err) {
        console.error(err);
        return false;  // Retorna falso em caso de erro
    }
};

// US008 
exports.verificarPreco = async function (valor, refeicaoId) {
    // procurar a refeição pelo ID e verificar se ela possui um prato associado
    const refeicao = await RefeicaoModel.findById(refeicaoId).populate('pratos'); // A refeição contém apenas um prato

    if (!refeicao) {
        throw new Error("Refeição não encontrada.");
    }

    const pratoId = refeicao.pratos[0]; // A refeição contém apenas um prato, pegar o primeiro prato

    // Buscar o prato correspondente
    const prato = await PratoModel.findById(pratoId);

    if (!prato) {
        throw new Error("Prato não encontrado.");
    }

    // Verificar se o valor da encomenda é suficiente
    if (valor >= prato.preco) {
        return true;
    } else {
        return false;

    }
}
