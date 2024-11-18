// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const PratoSchema = new Schema({
//     nome: String,
//     preco: Number,
//     emEmenta: { type: Boolean, default: true },
//     quantidade: { type: Number, default: 0 }  
// });

// module.exports = mongoose.model('Prato', PratoSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definindo o esquema do prato
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
    preco: {  // Adicionando o campo preco
        type: Number,
        default: null
    }
});

// Criando o modelo de prato
const PratoModel = mongoose.model('Prato', pratoSchema);

module.exports = PratoModel;
