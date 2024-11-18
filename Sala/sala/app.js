var express = require('express');
var app = express();
const salaRoutes = require('./routes/salaRoutes');

//Persistence ============
var mongoose = require ('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect ('mongodb+srv://TPSINF2user:TPSINF2pass@tpsinf2cluster.fbe14.mongodb.net/?retryWrites=true&w=majority&appName=TPSINF2Cluster')

//Parser  =================================
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Middleware ====================
var mWare = require('./middleware');
app.use(mWare);

//Routing  ====================
var SalaRouter= require ('./routes/salaRoutes');
app.use('/api', salaRoutes);


var port=8080;
app.listen(port);
console.log('--------------'+'\nUsing port'+ port + '\n--------------');

module.exports = app;