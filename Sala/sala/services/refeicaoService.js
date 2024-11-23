const RefeicaoRepo = require('../repositories/refeicaoRepository');
const PratoModel = require('../models/prato');

// US007: Consultar Ementa Disponível
exports.getRefeicoesEmEmenta = async function (data, tipoRefeicaoId) {
    try {
        console.log('[DEBUG] Início do método getRefeicoesEmEmenta');
        console.log(`[DEBUG] Parâmetros recebidos - data: ${data}, tipoRefeicaoId: ${tipoRefeicaoId}`);

        // Obter os pratos ativos
        const pratosAtivos = await PratoModel.find({ ativo: true }).select('_id'); // IDs dos pratos ativos
        console.log('[DEBUG] Pratos ativos encontrados:', pratosAtivos);

        if (pratosAtivos.length === 0) {
            console.log('[INFO] Nenhum prato ativo encontrado.');
            return [];
        }

        // Formatar a data recebida para um objeto Date válido
        const dataFormatada = new Date(data);
        console.log('[DEBUG] Data formatada para query:', dataFormatada);

        // Filtra as refeições pela data e tipo de refeição
        const refeicoes = await RefeicaoModel.find({
            data: { $eq: dataFormatada },
            tipoRefeicao: Number(tipoRefeicaoId),
            pratos: { $in: pratosAtivos.map(prato => prato._id) }
        });

        console.log('[DEBUG] Query executada no MongoDB:', {
            data: { $eq: dataFormatada },
            tipoRefeicao: Number(tipoRefeicaoId),
            pratos: { $in: pratosAtivos.map(prato => prato._id) }
        });
        console.log('[DEBUG] Refeições encontradas:', refeicoes);

        return refeicoes;
    } catch (error) {
        console.error('[ERRO] Erro ao obter refeições:', error.message);
        console.error('[DEBUG] Stack do erro:', error.stack);
        throw error;
    }
};


//US009: Listar Todas Refeições Servidas
exports.getRefeicaoWithClientes = async function (refeicaoId) {
    return await RefeicaoRepo.getRefeicaoWithClientes(refeicaoId);
};

// Adicionar Refeicoes ao MongoDB
const axios = require('axios');
const RefeicaoModel = require('../models/refeicao'); // Importa o modelo do MongoDB

// URL da API .NET
const DOTNET_API_URL = 'http://localhost:5057/api/refeicoes'; // Substitui pelo endpoint correto

// Função para obter refeições da API .NET
exports.getRefeicoesFromDotNetAPI = async () => {
    try {
        const response = await axios.get(DOTNET_API_URL);

        if (response.data && Array.isArray(response.data)) {
            console.log(`[SUCESSO] Obtidas ${response.data.length} refeições da API .NET.`);
            return response.data;
        } else {
            console.log('[INFO] Nenhuma refeição encontrada na API .NET.');
            return [];
        }
    } catch (error) {
        console.error(`[ERRO] Erro ao buscar refeições da API .NET: ${error.message}`);
        throw new Error('Erro ao buscar refeições da API .NET.');
    }
};

// Função para sincronizar refeições da API .NET com o MongoDB
exports.syncRefeicoesToMongoDB = async () => {
    try {
        const refeicoesFromAPI = await exports.getRefeicoesFromDotNetAPI();

        if (refeicoesFromAPI.length === 0) {
            console.log('[INFO] Não há refeições para sincronizar.');
            return;
        }

        for (const refeicao of refeicoesFromAPI) {
            // Utiliza idRefeicao como _id no MongoDB
            if (!refeicao.idRefeicao) {
                console.error(`[ERRO] Refeição sem ID encontrada. Dados: ${JSON.stringify(refeicao)}`);
                continue;
            }

            const novaRefeicao = {
                _id: refeicao.idRefeicao, // Mapeia idRefeicao para _id
                tipoRefeicao: refeicao.tipoRefeicao.id, // Armazena apenas o ID do tipo de refeição
                data: new Date(refeicao.data),
                quantidadeProduzida: refeicao.quantidadeProduzida || null,
                pratos: refeicao.prato ? [refeicao.prato.idPrato] : [] // Garante que os IDs dos pratos são armazenados num array
            };

            await RefeicaoModel.updateOne(
                { _id: novaRefeicao._id },
                novaRefeicao,
                { upsert: true }
            );
            console.log(`[SUCESSO] Refeição sincronizada: ${novaRefeicao._id}`);
        }

        console.log('[SUCESSO] Todas as refeições foram sincronizadas com o MongoDB.');
    } catch (error) {
        console.error(`[ERRO] Erro ao sincronizar refeições: ${error.message}`);
    }
};