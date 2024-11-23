const PratoModel = require('../models/prato');
const RefeicaoModel = require('../models/refeicao');

//US006: Definir prato
exports.adicionarPreco = async function (idPrato, preco) {
    try {
        const prato = await PratoModel.findById(idPrato);

        if (!prato) {
            return false;  // Retorna falso se o prato não for encontrado
        }

        // Atribui o preço ao prato
        prato.preco = preco;

        // Atualiza o prato na db<
        await prato.save();
        return true;
    } catch (err) {
        console.error(err);
        return false;  // Retorna falso em caso de erro
    }
};

//US008 - Encomendar Refeicao
exports.verificarPreco = async function (valor, refeicaoId) {
    const refeicao = await RefeicaoModel.findById(refeicaoId).populate('pratos'); //encontra uma refeição pelo refeicaoId e popula o campo pratos com os dados relacionados

    if (!refeicao) {
        throw new Error("Refeição não encontrada.");
    }

    const pratoId = refeicao.pratos;

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
