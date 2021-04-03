const express = require('express');
const routes = express.Router();

//const basePath = __dirname + "/views";
//o EJS já espera a pasta views poe isso não precisa setar o comando com __dirname
//porém como a pasta views ficou dentro do src eai precisamos colocar a const views
// com EJS utilizar o render e o nome do arquivo é sem extensão

const views = __dirname + "/views/"

const Profile = {
     data: {
          name : "Alfredo Jr",
          avatar : "https://avatars.githubusercontent.com/u/7894498?v=4",
          "monthly-budget" : 10000,
          "hours-per-day" : 5,
          "days-per-week" : 5,
          "vacation-per-year" : 4,
          "value-hours": 75
     },
     controllers :{
          index(req, res) {
               return res.render(views + "profile", { profile: Profile.data })

          },
          update(req,res){
               //req.body para pegar os dados
               const data = req.body;
               //definr quantas semanas tem um ano: 52
               const weeksPerYear = 52;
               //remotve as semans de férias do ano, para pegar quantas semanas tem em 1 mês
               const weeksPerMonth = (weeksPerYear - data["vacation-per-year"])/12;
               //total de horas trabalhadas na semana
               const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
               //horas trabalhadas no mês
               const monthlyTotalHours = weekTotalHours * weeksPerMonth;
               //qual sera o valor da hora
               const valueHour = data["value-hours"] = data["monthly-budget"] / monthlyTotalHours;

               Profile.data = {
                    ...Profile.data,
                    ...req.body,
                    "value-hours" : valueHour
               }
               return res.redirect('/profile');
          }
     }

}

const Job = {
     data: [ //array que irá receber os objetos de jobs cadastrados na rodat job
     {         
          id: 1,
          name:"Pizzaria Guloso",
          "daily-hours": 2,
          "total-hours": 1,
           created_at: Date.now()
          
     },
     {
          id: 2,
          name:"Hamburguer Ogro2",
          "daily-hours": 3,
          "total-hours": 50,
          created_at: Date.now()
     }
     ],

     controllers: {
          index(req, res) {

                    const updateJobs = Job.data.map((job)=> { 
                    const remaining = Job.services.remainingDays(job);
                    const status = remaining <=0 ? 'done' : 'progress';
                
                     return {
                          ...job,
                          remaining,
                          status,
                          budget: Job.services.calculateBudget (job, Profile.data["value-hours"])
                     }
                     });
                
                     return res.render(views + "index", { jobs: updateJobs });
                
                

          },

          create(req, res){
               return res.render(views + "job");
          },
          save(req, res) {
               //{ name: 'Alfredo', 'daily-hours': '5', 'total-hours': '20' }
                    
                    const lastId = Job.data[Job.data.length-1]?.id || 0; // o ?é um escape para caso não exsita o id, no caso o primeiro
               
                    Job.data.push({
                         id: lastId + 1,
                         name: req.body.name,
                         "daily-hours": req.body["daily-hours"],
                         "total-hours": req.body["total-hours"],
                         created_at: Date.now(), //atribuindo uma nova data
                         "value-hours": 75
               
                    });
               
                    return res.redirect('/');
          },
          show(req, res) {
               const jobId = req.params.id;
               // find procura dentro do array o id passado e retorna o objeto inteiro
               const job = Job.data.find(job => Number(job.id) === Number(jobId));

               if (!job){
                    return res.send('Job not found');
               }
               job.budget = Job.services.calculateBudget (job, Profile.data["value-hours"]);
               return res.render(views + "job-edit", { job });
          },
          update(req, res) {
               const jobId = req.params.id;
               // find procura dentro do array o id passado e retorna o objeto inteiro
               const job = Job.data.find(job => Number(job.id) === Number(jobId));

               if (!job){
                    return res.send('Job not found');
               }

               const updatedJob = {
                    ...job,
                    name:req.body.name,
                    "total-hours": req.body["total-hours"],
                    "daily-hours": req.body["daily-hours"]
               }

               Job.data = Job.data.map(job => {
                    if(Number(job.id) === Number(jobId)) {
                         job = updatedJob;
                    }
                    return job;
               })

               res.redirect('/job/' + jobId);
          },
          delete(req, res){
               const jobId = req.params.id;

               Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId));

               return res.redirect('/');
          }
     },
     services: {
          remainingDays (job){
               //ajuste no job
               //calculo de tempo restante
               const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
          
               const createdDate = new Date(job.created_at);
               const dueDay = createdDate.getDate() + Number(remainingDays);
               const dueDateInMs = createdDate.setDate(dueDay);
          
               const timeDiffInMs = dueDateInMs - Date.now();
               // transformar milli em dias
          
               // transforma milisegundos em dias
               const dayInMs = 1000 * 60 * 60 * 24
               const dayDiff = Math.floor(timeDiffInMs / dayInMs);
          
               return dayDiff;
          },
          calculateBudget: (job, valueHour) => valueHour * job["total-hours"]

     }
}



//request, response
routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;