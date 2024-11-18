const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mWare = require('./middleware');
const salaRoutes = require('./routes/salaRoutes');

const app = express();

// Configuração da Porta ====================
const PORT = 8080;

// Conexão à Base de Dados ====================
mongoose.set('strictQuery', true);
mongoose.connect(
    'mongodb+srv://TPSINF2user:TPSINF2pass@tpsinf2cluster.fbe14.mongodb.net/?retryWrites=true&w=majority&appName=TPSINF2Cluster'
)
    .then(() => console.log('Conexão à base de dados bem-sucedida.'))
    .catch((error) => console.error('Erro ao conectar à base de dados:', error));

// Middleware =================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mWare);
// Middleware para associar o prefixo '/api' às rotas de sala
app.use('/api', salaRoutes);

// Rotas =====================================
app.use('/api', salaRoutes);

// Iniciar o Servidor ========================
app.listen(PORT, () => {
    console.log(`--------------\nServidor em execução na porta ${PORT}\n--------------`);
});

module.exports = app;
