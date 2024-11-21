const mongoose = require('mongoose');
const Counter = require('../models/counter');

const clienteSchema = new mongoose.Schema({
    _id: { type: Number },
    name: { type: String, required: true },
    nif: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    account: {
        balance: { type: Number, default: 0 }, //Saldo inicial é 0
        transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }] //Transações associadas ao cliente
    }
});

// Gera um novo ID numérico para o cliente, ao invés de usar o ObjectId
clienteSchema.pre('save', async function(next) {
    if (this.isNew) {
        // Pega o próximo valor de ID do contador
        const counter = await Counter.findOneAndUpdate(
            { _id: 'cliente_id' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this._id = counter.seq;  // Atribui o valor do contador ao _id do cliente
    }
    next();
});

module.exports = mongoose.model('Cliente', clienteSchema);