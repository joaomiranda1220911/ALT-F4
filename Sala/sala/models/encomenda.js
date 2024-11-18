const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var EncomendaSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente' },
    refeicao: { type: Schema.Types.ObjectId, ref: 'Refeicao' },
    data: Date,
    valor: Number
});

module.exports = mongoose.model('Encomenda', EncomendaSchema);
