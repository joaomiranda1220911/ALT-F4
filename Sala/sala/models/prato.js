var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Definir o esquema do prato
var PratoSchema = new Schema({
    _id: { type: Number }, 
    nome: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    tipoPrato: {
        id: { type: Number },
        //tipo: { type: String, required: true, maxlength: 100, trim: true },
       // descrição: { type: String, required: false, maxlength: 100 }
    },
    ingredientes: {
        id: { type: Number },
        //nome: { type: String, required: true, maxlength: 100, trim: true },
        //categoria: {type: String, required: true},
        //ativo:{type: Boolean, required: true}
    },
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