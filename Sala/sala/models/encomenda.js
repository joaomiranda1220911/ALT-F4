const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EncomendaSchema = new Schema({
    cliente: { type: Number, required: true },
    refeicao: { type: Number, required: true },
    data: { type: Date, default: Date.now },
    valor: { type: Number, required: true }
});

module.exports = mongoose.model('Encomenda', EncomendaSchema);
