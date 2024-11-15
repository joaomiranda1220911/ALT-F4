const PratoRepo = require('../repositories/pratoRepository');
const ContaClienteRepo = require('../repositories/contaClienteRepository');

exports.encomendarPrato = async function (clienteId, pratoId) {
    const conta = await ContaClienteRepo.getContaClienteById(clienteId);
    if (!conta) return { success: false, message: 'Conta do cliente não encontrada' };

    const prato = await PratoRepo.getPratosEmEmenta();
    const pratoSelecionado = prato.find(p => p._id.toString() === pratoId);
    if (!pratoSelecionado) return { success: false, message: 'Prato não encontrado ou indisponível' };

    if (conta.saldo < pratoSelecionado.preco) {
        return { success: false, message: 'Saldo insuficiente' };
    }

    const atualizado = await PratoRepo.decrementarQuantidadePrato(pratoId);
    if (!atualizado) return { success: false, message: 'Erro ao processar o pedido' };

    await ContaClienteRepo.atualizarSaldo(clienteId, conta.saldo - pratoSelecionado.preco);

    return { success: true, message: 'Prato encomendado com sucesso' };
};
