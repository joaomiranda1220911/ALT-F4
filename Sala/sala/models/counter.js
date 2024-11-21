const mongoose = require('mongoose');

// Modelo para o contador de IDs
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }  // Valor inicial do contador
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
