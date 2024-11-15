const EncomendaRepo = require('../repositories/encomendaRepository');
exports.getEncomendasByCliente = async function (clienteId) {
    const encomendas = await EncomendaRepo.getEncomendasByClienteId(clienteId);
    return encomendas.map(encomenda => ({
        data: encomenda.data.toLocaleString(),
        pratoNome: encomenda.refeicao.pratoNome,
        valor: encomenda.valor
    }));
};
