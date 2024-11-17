const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nif: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    accout: {
        balance: { type: Number, default: 0 }, //Saldo inicial é 0
        transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }] //Transações associadas ao cliente
    }
});

module.exports = mongoose.model('Cliente', clienteSchema);