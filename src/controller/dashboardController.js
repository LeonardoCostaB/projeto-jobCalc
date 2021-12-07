const Job = require('../model/job')
const Profile = require('../model/profile')
const jobUtils = require('../utils/jobUtils')


module.exports = {
  async index(req, res){
    const jobs = await Job.get()
    const profile = await Profile.get()

    let statusCount = {
      done: 0,
      progress: 0,
      total: jobs.length
    }

    let totalHourJob = 0

    const updateJobs = jobs.map(job => {
      const remaining = jobUtils.remainingDays(job)
      const status = remaining <= 0  ? 'done' : 'progress'

      statusCount[status]  += 1 

      totalHourJob = status == 'progress' ? totalHourJob + Number(job["daily-hours"]) : totalHourJob

      return {
        ...job,
        remaining,
        status,
        budget: job["total-hours"] * profile["value-hour"]
      }  
    })

    const freeHour = profile["hours-per-day"] - totalHourJob

    let isNoJobs

    if (jobs.length == 0) {
        isNoJobs = true
    }

    res.render('index', {jobs: updateJobs, profile: profile, statusCount: statusCount, freeHour: freeHour, isNoJobs: isNoJobs})
  }
}