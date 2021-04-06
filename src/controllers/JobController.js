const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile');

module.exports = {
  create(req, res){
       return res.render("job");
  },
  save(req, res) {
    //{ name: 'Alfredo', 'daily-hours': '5', 'total-hours': '20' }
    const jobs = Job.get();          
    const lastId = jobs[jobs.length-1]?.id || 0; // o ?é um escape para caso não exsita o id, no caso o primeiro
       
    jobs.push({
      id: lastId + 1,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), //atribuindo uma nova data
          
    });
       
    return res.redirect('/');
  },
  show(req, res) {
       const jobId = req.params.id;
       const jobs = Job.get();
       const profile = Profile.get();
       // find procura dentro do array o id passado e retorna o objeto inteiro
       const job = jobs.find(job => Number(job.id) === Number(jobId));

       if (!job){
            return res.send('Job not found');
       }
       job.budget = JobUtils.calculateBudget (job, profile["value-hours"]);
       return res.render("job-edit", { job });
  },
  update(req, res) {
       const jobId = req.params.id;
       const jobs = Job.get();
       // find procura dentro do array o id passado e retorna o objeto inteiro
       const job = jobs.find(job => Number(job.id) === Number(jobId));

       if (!job){
            return res.send('Job not found');
       }

       const updatedJob = {
            ...job,
            name:req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
       }

       const newJobs = jobs.map(job => {
            if(Number(job.id) === Number(jobId)) {
                 job = updatedJob;
            }
            return job;
       })
       Job.update(newJobs);

       res.redirect('/job/' + jobId);
  },
  delete(req, res){
       const jobId = req.params.id;
       Job.delete(jobId);

       return res.redirect('/');
  }
}