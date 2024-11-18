const webApiClient = require('axios').default;

exports.getPratoById = async function (idPrato) {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    const Grupo2AWebAPIURL = 'http://localhost:5057/api/Grupo2A/';
    const thePrato = await webApiClient.get(Grupo2AWebAPIURL + idPrato);
    return thePrato.data;
}