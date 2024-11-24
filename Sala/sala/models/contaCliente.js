const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contaClienteSchema = new Schema({
    cliente: { type: Number, required: true },
    saldo: { type: Number, default: 0 }
});

module.exports = mongoose.model('cliente', contaClienteSchema);