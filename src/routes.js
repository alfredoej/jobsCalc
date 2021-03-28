const express = require('express');
const routes = express.Router();

//const basePath = __dirname + "/views";
//o EJS já espera a pasta views poe isso não precisa setar o comando com __dirname
//porém como a pasta views ficou dentro do src eai precisamos colocar a const views
// com EJS utilizar o render e o nome do arquivo é sem extensão

const views = __dirname + "/views/"

const profile ={
     name : "Alfredo Jr",
     avatar : "https://avatars.githubusercontent.com/u/7894498?v=4",
     "monthly-budget" : 10000,
     "hours-per-day" : 5,
     "days-per-week" : 5,
     "vacation-per-year" : 4

}
//request, response
routes.get('/', (req, res) => res.render(views + "index"));
routes.get('/job', (req, res) => res.render(views + "job"));
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }));

module.exports = routes;