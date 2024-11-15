const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contaClienteSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    saldo: { type: Number, default: 0 } 
});

module.exports = mongoose.model('cliente', contaClienteSchema);
