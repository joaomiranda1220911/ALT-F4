const Counter = require('../models/counter');

async function initializeCounter() {
    // Tenta encontrar um documento na coleção 'Counter' com _id igual a 'cliente_id'.
    const count = await Counter.findOne({ _id: 'cliente_id' });


    // Se não encontrar o documento (o que significa que o contador ainda não foi inicializado),
    // então cria um novo documento com o _id 'cliente_id' e a sequência inicializada com 0.
    if (!count) {
        await Counter.create({ _id: 'cliente_id', seq: 0 });  // Inicializa o contador com o valor 0
    }
}

module.exports = { initializeCounter };
