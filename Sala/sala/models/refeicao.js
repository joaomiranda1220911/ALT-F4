const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RefeicaoSchema = new Schema({
    _id: { type: Number },
    tipoRefeicao: { type: Number, required: true }, // Apenas o ID do tipo de refeição
    data: { type: Date, required: true },
    quantidadeProduzida: { type: Number, default: null },
    pratos: [{ type: mongoose.Schema.Types.Number, ref: 'Prato' }] // IDs dos pratos
});

const RefeicaoModel = mongoose.model('Refeicao', RefeicaoSchema);

module.exports = RefeicaoModel;
