const axios = require('axios');

// URL da API .NET onde os pratos estão disponíveis
const DOTNET_API_URL = 'http://localhost:5057/api/pratos';

exports.getPratoById = async (idPrato) => {
    try {
        // chamada HTTP para buscar os pratos
        const response = await axios.get(`${DOTNET_API_URL}/${idPrato}`);

        if (response.data) {
            return response.data; // Retorna o prato encontrado
        } else {
            return null; // Se não encontrar o prato, retorna null
        }
    } catch (error) {
        throw new Error('Erro ao buscar prato na API .NET');
    }
};

exports.getRefeicaoById = async (idRefeicao) => {
    try {
        // chamada HTTP para buscar os pratos
        const response = await axios.get(`${DOTNET_API_URL}/${idRefeicao}`);

        if (response.data) {
            return response.data; // Retorna o prato encontrado
        } else {
            return null; // Se não encontrar o prato, retorna null
        }
    } catch (error) {
        throw new Error('Erro ao buscar refeicao na API .NET');
    }
};

exports.getRefeicoesFromDotNetAPI = async () => {
    try {
        // Chamada para obter todas as refeições
        const response = await axios.get(DOTNET_API_URL);

        if (response.data && Array.isArray(response.data)) {
            console.log(`[SUCESSO] Obtidas ${response.data.length} refeições da API .NET.`);
            return response.data; // Retorna todas as refeições
        } else {
            console.log('[INFO] Nenhuma refeição encontrada na API .NET.');
            return [];
        }
    } catch (error) {
        console.error(`[ERRO] Erro ao buscar refeições da API .NET: ${error.message}`);
        throw new Error('Erro ao buscar refeições da API .NET.');
    }
};