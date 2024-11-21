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
        type: Date,
        required: true
    },
    quantidadeProduzida: {  
        type: Number,
        default: null
    },
    pratos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prato' }]
});

const RefeicaoModel = mongoose.model('Refeicao', RefeicaoSchema);

module.exports = RefeicaoModel;
