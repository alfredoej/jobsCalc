const express = require('express');
const routes = express.Router();
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboardController = require('./controllers/DashboardController');

//const basePath = __dirname + "/views";
//o EJS já espera a pasta views poe isso não precisa setar o comando com __dirname
//porém como a pasta views ficou dentro do src eai precisamos colocar a const views
// com EJS utilizar o render e o nome do arquivo é sem extensão

//request, response
routes.get('/', DashboardController.index);
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;