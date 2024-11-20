const PratoRepo = require('../repositories/pratoRepository');
const ContaClienteRepo = require('../repositories/contaClienteRepository');
const EncomendaRepo = require('../repositories/encomendaRepository');

//US008 - Encomendar Refeicao
exports.encomendarRefeicao = async function (clienteId, refeicaoId) {
    const conta = await ContaClienteRepo.getContaClienteById(clienteId);
    if (!conta) return { success: false, message: 'Conta do cliente não encontrada' };

    // ve se a refeicao pedida esta na ementa
    const refeicao = await RefeicaoRepo.getRefeicaoEmEmenta(); // MUDAR ESTA FUNCAO
    const refeicaoSelecionado = refeicao.find(p => p._id.toString() === refeicaoId);
    if (!refeicaoSelecionado) return { success: false, message: 'Refeicao não encontrada ou indisponível' };


    // ve o preco do prato associado à refeicao
    const pratoRefeicao = await
    if (conta.saldo < refeicaoSelecionado.preco) {
        return { success: false, message: 'Saldo insuficiente' };
    }
    // se o saldo for suficiente decrementa a quantidade de refeicao
    const atualizado = await RefeicaoRepo.decrementarQuantidadeRefeicao(refeicaoId);
    if (!atualizado) return { success: false, message: 'Erro ao processar o pedido' };

    // e atualiza saldo
    await ContaClienteRepo.atualizarSaldo(clienteId, conta.saldo - refeicaoSelecionado.preco);

    return { success: true, message: 'Refeicao encomendada com sucesso' };
};

//US010 - Listar Encomendas por Cliente
exports.getEncomendasByCliente = async function (clienteId) {
    const encomendas = await EncomendaRepo.getEncomendasByClienteId(clienteId);
    return encomendas.map(encomenda => ({
        data: encomenda.data.toLocaleString(), // converte a data para string
        pratos: encomenda.refeicao.pratos.map(prato => prato.nome).join(', '),
        valor: encomenda.valor.toFixed(2) + "€" //um preço nao pode ter mais que 2 casas decimais 
    }));
};
