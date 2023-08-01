const express = require('express');
const symptomsRoutes = require('./api/routes/symptoms');
const nutritionRoutes = require('./api/routes/nutritions');
const userRoutes = require('./api/routes/user');
const exerciseRoutes = require('./api/routes/exercises');
const healthproviderRoutes = require('./api/routes/healthProvider');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const healthprovider = require('./api/models/healthprovider');


//Middlewares
const app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acesss-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/symptoms', symptomsRoutes);
app.use('/nutritions', nutritionRoutes);
app.use('/user', userRoutes);
app.use('/exercise', exerciseRoutes);
app.use('/healthprovider', healthproviderRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});
module.exports = app;