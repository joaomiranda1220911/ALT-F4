const PratoRepo = require('../repositories/pratoRepository');
const EncomendaRepo = require('../repositories/encomendaRepository');
const RefeicaoRepo = require('../repositories/refeicaoRepository');
const ClienteRepo = require('../repositories/clienteRepository');

//US008 - Encomendar Refeicao
exports.criarEncomenda = async function (encomendaDTO) {
    try {
        // Verificar saldo do cliente
        const clienteSaldo = await ClienteRepo.getClienteSaldoByNif(encomendaDTO.cliente);
        console.log("Saldo retornado:", clienteSaldo);

        if (!clienteSaldo || clienteSaldo < encomendaDTO.valor) {
            throw new Error("Saldo insuficiente.");
        }

        // verificar se o valor da encomenda => preco do prato
        const valorPreco = await PratoRepo.verificarPreco(encomendaDTO.valor, encomendaDTO.refeicao);
        if (!valorPreco){
            throw new Error("Valor da encomenda deve ser igual ou superior ao preço do prato");
        }

        // Criar a encomenda
        const novaEncomenda = await EncomendaRepo.createEncomenda({
            cliente: encomendaDTO.cliente,
            refeicao: encomendaDTO.refeicao,
            valor: encomendaDTO.valor
        });

        // Decrementar a quantidade da refeição
        const quantidadeDecrementada = await RefeicaoRepo.decrementarQuantidadeRefeicao(encomendaDTO.refeicao);
        if (!quantidadeDecrementada) {
            throw new Error("Refeição sem stock.");
        }

        // Atualizar saldo do cliente
        await ClienteRepo.carregarSaldo(encomendaDTO.cliente, -encomendaDTO.valor);
        return novaEncomenda;

    } catch (error) {
        console.error("Erro ao criar encomenda:", error);
        throw error;
    }
};

//US010 - Listar Encomendas por Cliente
exports.getEncomendasByCliente = async function (clienteId) {
    const encomendas = await EncomendaRepo.getEncomendasByClienteId(clienteId);
    if (!encomendas || encomendas.length === 0) {
        return [];
    }
    return encomendas.map(encomenda => ({
        data: encomenda.data?.toLocaleString() || "Data indisponível", //converte a date para uma string
        refeicao: encomenda.refeicao?._id || encomenda.refeicao || "ID de refeição indisponível",
        valor: encomenda.valor?.toFixed(2) + "€" || "0.00€"
    }));
};