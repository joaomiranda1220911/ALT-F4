const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RefeicaoSchema = new Schema({
    _id: { type: Number }, 
    tipoRefeicao: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    data: {
        type: Date, default: Date.now(),
        required: true
    },
    quantidadeProduzida: {  
        type: Number,
        default: null
    },
    pratos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prato' }]
});

module.exports = mongoose.model('Refeicao', RefeicaoSchema);
