const webApiClient = require('axios').default;

// exports.getHero = async function (id) {
//     process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
//     const herosWebAPIURL = 'https://localhost:7291/api/Heroes'
//     const theHero = await webApiClient.get(herosWebAPIURL + id);
//     return theHero.data;
// }