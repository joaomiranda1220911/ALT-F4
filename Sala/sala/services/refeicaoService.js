const RefeicaoRepo = require('../repositories/refeicaoRepository');

// US007: Consultar Ementa Disponível
exports.getEmentaDisponivel = async function (data, tipoRefeicaoId) {
    try {
        console.log('A procurar refeições para a data:', data, 'e tipo de refeição:', tipoRefeicaoId);

        // Passa os parâmetros para o repositório e filtra as refeições pela data e tipo de refeição
        const refeicoes = await RefeicaoRepo.getRefeicoesEmEmenta(data, tipoRefeicaoId);

        console.log('Refeições encontradas:', refeicoes);
        return refeicoes;
    } catch (error) {
        console.error('Erro ao obter a ementa:', error);
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
            const novaRefeicao = {
                _id: refeicao.id,
                tipoRefeicao: refeicao.tipoRefeicao,
                data: new Date(refeicao.data),
                quantidadeProduzida: refeicao.quantidadeProduzida || null,
                pratos: refeicao.pratos || []
            };

            await RefeicaoModel.updateOne(
                { _id: novaRefeicao._id },
                novaRefeicao,
                { upsert: true }
            );
            console.log(`[SUCESSO] Refeição sincronizada: ${novaRefeicao.tipoRefeicao}`);
        }

        console.log('[SUCESSO] Todas as refeições foram sincronizadas com o MongoDB.');
    } catch (error) {
        console.error(`[ERRO] Erro ao sincronizar refeições: ${error.message}`);
    }
};