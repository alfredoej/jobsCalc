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

//array que irá receber os objetos de jobs cadastrados na rodat job
const jobs = [
{
     id: 1,
     name:"Pizzaria Guloso",
     "daily-hours": 2,
     "total-hours": 30,
     created_at: Date.now()   
},
{
     id: 2,
     name:"Hamburguer Ogro",
     "daily-hours": 3,
     "total-hours": 50,
     created_at: Date.now()   
}

];

//request, response
routes.get('/', (req, res) => res.render(views + "index", { jobs }));
routes.get('/job', (req, res) => res.render(views + "job"));

routes.post('/job', (req, res) => {
//{ name: 'Alfredo', 'daily-hours': '5', 'total-hours': '20' }
     
     const lastId = jobs[jobs.length-1]?.id || 1; // o ?é um escape para caso não exsita o id, no caso o primeiro

     jobs.push({
          id: lastId + 1,
          name: req.body.name,
          "daily-hours": req.body["daily-hours"],
          "total-hours": req.body["total-hours"],
          created_at: Date.now() //atribuindo uma nova data

     });

     return res.redirect('/');
});

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"));
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }));

module.exports = routes;