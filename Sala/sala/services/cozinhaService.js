const axios = require('axios');

// URL da API .NET onde os pratos estão disponíveis
const DOTNET_API_URL = 'http://localhost:5057/api/pratos';  // Ajusta para o URL correto

exports.getPratoById = async (idPrato) => {
    try {
        // Fazendo a chamada HTTP para buscar os pratos
        const response = await axios.get(`${DOTNET_API_URL}/${idPrato}`);

        if (response.data) {
            return response.data; // Retorna o prato encontrado
        } else {
            return null; // Se não encontrar o prato, retorna null
        }
    } catch (error) {
        console.error('Erro ao buscar prato na API .NET:', error.message);
        throw new Error('Erro ao buscar prato na API .NET');
    }
};