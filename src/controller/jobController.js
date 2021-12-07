const Job = require('../model/job')
const Profile = require('../model/profile')
const jobUtils = require('../utils/jobUtils')
const Dashboard = require('./dashboardController')

module.exports = {
  create(req, res){
    res.render('job')
  },

  async save(req, res){
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      createdAt: Date.now()
    })

    res.redirect('/')
  },

  async show(req, res){
    const jobs = await Job.get()
    const profile = await Profile.get()

    const jobId = req.params.id
    
    const job = jobs.find(job => Number(job.id) === Number(jobId))

    if(!job){
      res.send('Job not found!')
    }

    job.budget = job["total-hours"] * profile["value-hour"]

    res.render('job-edit', { job })
  },

  async update(req, res){
    const jobId = req.params.id
    const name = req.body.name

    const updateJob = {
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"]
    }

    await Job.update(updateJob, jobId)

    res.redirect('/job/' + jobId)
  },

  async delete(req, res){
    const jobId = req.params.id

    await Job.delete(jobId)

    res.redirect('/')
  }
}
