const Counter = require('../models/counter');

async function initializeCounter() {
    const count = await Counter.findOne({ _id: 'cliente_id' });

    if (!count) {
        await Counter.create({ _id: 'cliente_id', seq: 0 });  // Inicializa o contador com o valor 0
    }
}

module.exports = { initializeCounter };
