const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PratoSchema = new Schema({
    nome: String,
    preco: Number,
    emEmenta: { type: Boolean, default: true },
    quantidade: { type: Number, default: 0 }  
});

module.exports = mongoose.model('Prato', PratoSchema);
