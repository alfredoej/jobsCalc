const Profile = require ('../model/Profile');

//module.export deixa o arquivo exportavel
module.exports = {
  index(req, res) {
       return res.render("profile", { profile: Profile.get() })

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

       Profile.update ({
            ...Profile.get(),
            ...req.body,
            "value-hours" : valueHour
       });

       return res.redirect('/profile');
  }
}