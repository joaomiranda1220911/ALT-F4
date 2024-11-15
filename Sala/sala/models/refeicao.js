const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RefeicaoSchema = new Schema({
    tipo: String, // Exemplo: "almoço", "jantar"
    pratos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prato' }]
});
module.exports = mongoose.model('Refeicao', RefeicaoSchema);
