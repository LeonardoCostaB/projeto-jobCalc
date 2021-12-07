const profile = require('../model/profile')

module.exports = {
  async index(req, res){
    res.render('profile', {profile: await profile.get()})
  },

  async update(req, res){
    
    const data = req.body

    // Definindo quantas semanas tem no ano
    const weeksPerYear = 52

    //Remover as semanas de férias do ano, para pegart quantas semanas tem em 1 mês
    const weeksPerMouth = (weeksPerYear - data["vacation-per-year"]) / 12

    //horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

    //horas trabalhadas no mês
    const monthyTotalHours = weekTotalHours * weeksPerMouth

    //valor da minha hora
    const valueHour = data["monthly-budget"] / monthyTotalHours
    
    await profile.update({
      ... await profile.get(),
      ...req.body,
      "value-hour": valueHour
    })

    res.redirect('/profile')
  }
}