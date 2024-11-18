const webApiClient = require('axios').default;

exports.getPrato = async function (idPrato) {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; // Apenas para testes locais
    const Grupo2AWebAPIURL = 'https://localhost:7291/api/Grupo2A/';

    try {
        console.log(`A enviar pedido para ${Grupo2AWebAPIURL}${idPrato}`);
        const thePrato = await webApiClient.get(`${Grupo2AWebAPIURL}${idPrato}`);

        if (!thePrato || !thePrato.data) {
            console.error(`Nenhum prato encontrado com ID ${idPrato}`);
            return null;
        }

        return thePrato.data;
    } catch (error) {
        console.error(`Erro ao obter o prato com ID ${idPrato}:`, error.message);
        return null; 
    }
};


// exports.getHero = async function (id) {
//     process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//     const herosWebAPIURL = 'https://localhost:7291/api/Heroes'
//     const theHero = await webApiClient.get(herosWebAPIURL + id);
//     return theHero.data;
// }