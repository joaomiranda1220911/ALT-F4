var express = require('express');
var app = express();
const { syncRefeicoesToMongoDB } = require('./services/refeicaoService');
const { initializeCounter } = require('./counter/initializeCounter.js');
const cors = require('cors');

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:4200', // Permite apenas o frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permite envio de cookies, se necessário
}));

//Persistence ============
var mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(
    'mongodb+srv://TPSINF2user:TPSINF2pass@tpsinf2cluster.fbe14.mongodb.net/?retryWrites=true&w=majority&appName=TPSINF2Cluster'
)
    .then(() => {
        console.log('Conexão à base de dados bem-sucedida.');

        // Sincronizar refeições da API .NET para o MongoDB
        syncRefeicoesToMongoDB();

        // Chama a função para inicializar o contador
        initializeCounter();
    })
    .catch((error) => console.error('Erro ao conectar à base de dados:', error));

//Parser  =================================
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware =================================
var mWare = require('./middleware');
app.use(mWare);

//Routing  ====================
var salaRouter = require('./routes/salaRoutes');
app.use('/sala', salaRouter);

var pratoRouter = require('./routes/pratoRoutes');
app.use('/api/pratos', pratoRouter);

var clienteRouter = require('./routes/clienteRoutes');
app.use('/api/cliente', clienteRouter);

var encomendaRouter = require('./routes/encomendaRoutes');
app.use('/api/encomendas', encomendaRouter);

// Middleware =================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(mWare);

// Iniciar o Servidor ========================
var PORT = 8080;
app.listen(PORT, () => {
    console.log(`--------------\nServidor em execução na porta ${PORT}\n--------------`);
});

module.exports = app;