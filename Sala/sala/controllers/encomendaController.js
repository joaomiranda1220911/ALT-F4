//US010
const EncomendaService = require('../services/encomendaService');
exports.listarEncomendasCliente = async function (req, res) {
    const clienteId = req.params.clienteId;
    const result = await EncomendaService.getEncomendasByCliente(clienteId);
    res.status(200).json(result);
};

