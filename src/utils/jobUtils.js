module.exports = {

  remainingDays(job){
    //Cálculo de tempo restante

    //Cálculo do prazo da entrega do projeto em dias
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

    //Data de quando eu iniciei o meu projeto
    const createdDate = new Date(job.createdAt)

    //Dia do vencimento do meu projeto
    const dueDay = createdDate.getDate() + Number(remainingDays)

    //Data exata do vencimento
    const dueDate = createdDate.setDate(dueDay)

    //Dias corridos do inicio do projeto até o dia do vencimento /* diferença do tempo em milisegundos */
    const timeDiffInMs = dueDate - Date.now()

    //Transformando milli em Dias
    const dayInMs = 1000 * 60 * 60 * 24

    //Diferença em dia arredondado
    const dayDiff = Math.floor(timeDiffInMs / dayInMs)

    return dayDiff
  
  },
}