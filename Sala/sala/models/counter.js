const mongoose = require('mongoose');

// Modelo para o contador de IDs
const counterSchema = new mongoose.Schema({

    // Define o campo '_id', que será do tipo String e é obrigatório (required).
    _id: { type: String, required: true },

    // Define o campo 'seq', que será do tipo Number e tem um valor padrão de 0.
    // Esse campo representa o valor do contador.
    seq: { type: Number, default: 0 }  // Valor inicial do contador
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
