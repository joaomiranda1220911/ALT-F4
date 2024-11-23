var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PratoSchema = new Schema({
    _id: { type: Number },
    nome: { type: String, required: true, maxlength: 100, trim: true },
    tipoPrato: { id: { type: Number } },
    ingredientes: { id: { type: Number } },
    receita: { type: String, default: null },
    ativo: { type: Boolean, required: true, default: true },
    preco: { type: Long, default: null }
});

module.exports = mongoose.model('Prato', PratoSchema);