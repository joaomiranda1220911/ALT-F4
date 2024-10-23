// const ingredienteModel = require('../models/ingrediente');
// const ingredienteService = require('../services/ingredienteService');


// Método para inativar um ingrediente e atualizar o estado de todos os pratos que o utilizam.
//  PATCH/PUT --> /api/ingredientes/{id}

// exports.updateEstadoIngredienteInativar = async function (req, res) {
//     const ingredienteId = req.params.id;
//     const ingredienteEstado = 'inativo'; // Define o estado como 'inativo'

//     try {
//         // Atualiza o estado do ingrediente
//         const ingredienteResult = await ingredienteService.updateIngredienteEstado(ingredienteId, ingredienteEstado);
        
//         if (!ingredienteResult) {
//             return res.status(404).json({ error: 'Ingrediente não encontrado' });
//         }

//         const pratosAfetados = await pratoService.getPratosByIngredienteId(ingredienteId);

//         // Atualiza o estado de todos os pratos que o contem
//         const updatePromises = pratosAfetados.map(prato => {
//             return pratoService.updatePratoEstado(prato.id, ingredienteEstado); // ATENÇÃO NOME DO METODO UPDATEPRATOESTADO REVER !!!!
//         });

//         await Promise.all(updatePromises);

//         res.status(200).json({ message: 'Estado do ingrediente e dos pratos atualizados com sucesso' });
//     } catch (error) {
//         res.status(500).json({ error: 'Erro ao atualizar o estado do ingrediente e dos pratos' });
//     }
// }


