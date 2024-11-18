const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir o esquema do prato
const pratoSchema = new mongoose.Schema({
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

// Criar o modelo de prato
const PratoModel = mongoose.model('Prato', pratoSchema);

module.exports = PratoModel;
