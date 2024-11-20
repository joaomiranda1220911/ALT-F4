const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EncomendaSchema = new Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    refeicao: { type: mongoose.Schema.Types.ObjectId, ref: 'Refeicao', required: true },
    data: { type: Date, default: Date.now },
    valor: { type: Number, required: true }
});

module.exports = mongoose.model('Encomenda', EncomendaSchema);
