var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definir o esquema do prato
var PratoSchema = new Schema({
    _id: { type: Number },  // ID numérico
    nome: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    tipoPrato: {
        type: String,
        required: true
    },
    ingredientes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingrediente'  // Referência para o modelo de Ingrediente
    }],
    receita: {
        type: String,
        default: null
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    },
    preco: {  
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Prato', PratoSchema);