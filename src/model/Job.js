let data = [ //array que irá receber os objetos de jobs cadastrados na rodat job
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
  ];

  module.exports = {
    get(){
      return data;
    },
    update(newJob){
      data = newJob;
    },
    delete(id) {
      //de onde vem esse job.id
      data = data.filter(job => Number(job.id) != Number(id));
    }
  }