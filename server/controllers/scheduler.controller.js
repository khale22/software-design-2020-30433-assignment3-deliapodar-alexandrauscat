import schedule from '../models/schedule.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import defaultImage from './../../client/assets/images/default.png'

const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Image could not be uploaded"
      })
    }
    let schedule = new schedule(fields)
    schedule.owner= req.profile
    if(files.image){
      schedule.image.data = fs.readFileSync(files.image.path)
      schedule.image.contentType = files.image.type
    }
    try {
      let result = await schedule.save()
      res.status(200).json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const scheduleByID = async (req, res, next, id) => {
  try {
    let schedule = await schedule.findById(id).populate('owner', '_id name').exec()
    if (!schedule)
      return res.status('400').json({
        error: "schedule not found"
      })
    req.schedule = schedule
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve schedule"
    })
  }
}

const photo = (req, res, next) => {
  if(req.schedule.image.data){
    res.set("Content-Type", req.schedule.image.contentType)
    return res.send(req.schedule.image.data)
  }
  next()
}
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd()+defaultImage)
}

const read = (req, res) => {
  req.schedule.image = undefined
  return res.json(req.schedule)
}

const update = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "Photo could not be uploaded"
      })
    }
    let schedule = req.schedule
    schedule = extend(schedule, fields)
    schedule.updated = Date.now()
    if(files.image){
      schedule.image.data = fs.readFileSync(files.image.path)
      schedule.image.contentType = files.image.type
    }
    try {
      let result = await schedule.save()
      res.json(result)
    }catch (err){
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

const remove = async (req, res) => {
  try {
    let schedule = req.schedule
    let deletedschedule = schedule.remove()
    res.json(deletedschedule)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }  
}

const list = async (req, res) => {
  try {
    let schedules = await schedule.find()
    res.json(schedules)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByOwner = async (req, res) => {
  try {
    let schedules = await schedule.find({owner: req.profile._id}).populate('owner', '_id name')
    res.json(schedules)
  } catch (err){
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const isOwner = (req, res, next) => {
  const isOwner = req.schedule && req.auth && req.schedule.owner._id == req.auth._id
  if(!isOwner){
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

export default {
  create,
  scheduleByID,
  photo,
  defaultPhoto,
  list,
  listByOwner,
  read,
  update,
  isOwner,
  remove
}
