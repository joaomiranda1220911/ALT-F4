const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PratoSchema = new Schema({
    nome: String,
    preco: Number,
    emEmenta: { type: Boolean, default: true },
    quantidade: { type: Number, default: 0 }  
});

module.exports = mongoose.model('Prato', PratoSchema);


// const mongoose = require('mongoose');
// const Schema = mongoose.Schema; 
// const { getPrato } = require('./utils/getPrato'); // Método para buscar prato na API ASP.NET

// // Definindo o Schema do Prato
// const PratoSchema = new mongoose.Schema({
//     idPrato: { type: Number, required: true },
//     nome: { type: String, required: true },
//     tipoPrato: { type: String, required: true },
//     ingredientes: { type: [String], required: true },
//     receita: { type: String, required: false },
//     ativo: { type: Boolean, required: true },
//     preco: { type: Number, required: true },  // Novo campo
//     emEmenta: { type: Boolean, default: true } // Novo campo
// });

// // Criando o modelo do prato
// const Prato = mongoose.model('Prato', PratoSchema);

// async function integrarPrato(idPrato, preco, emEmenta = true) {
//     try {
//         // Buscar o prato pela API ASP.NET
//         const pratoData = await getPrato(idPrato);

//         if (!pratoData) {
//             throw new Error(`Prato com ID ${idPrato} não encontrado.`);
//         }

//         // Adicionar o preço e o campo emEmenta ao prato
//         pratoData.preco = preco;
//         pratoData.emEmenta = emEmenta;

//         // Criar um novo prato no MongoDB com os dados recebidos
//         const novoPrato = new Prato({
//             idPrato: pratoData.idPrato,
//             nome: pratoData.nome,
//             tipoPrato: pratoData.tipoPrato,
//             ingredientes: pratoData.ingredientes,
//             receita: pratoData.receita,
//             ativo: pratoData.ativo,
//             preco: pratoData.preco, // Novo campo
//             emEmenta: pratoData.emEmenta // Novo campo
//         });

//         // Salvar o novo prato no MongoDB
//         await novoPrato.save();
//         console.log("Prato integrado com sucesso!");
//     } catch (error) {
//         console.error("Erro:", error.message);
//     }
// }

// module.exports = { integrarPrato };