const TaskModel = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/commonError')
module.exports.getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await TaskModel.find({})
    res.status(200).json({tasks})
})
module.exports.addNewTask = asyncWrapper(async (req, res) => {
    const {name, completed} = req.body
    const task = await TaskModel.create({name: name, completed: completed})
    res.status(201).json({task})
})
module.exports.getSingleTask = asyncWrapper(async (req, res, next) => {
    const {id:taskID} = req.params
    const task = await TaskModel.findOne({_id:taskID})
    if(!task){
        return next(createCustomError(`Task With ID ${taskID} Not Found`, 404))
    }
    res.status(200).json({task})
})
module.exports.updateTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params
    const task = await TaskModel.findOneAndUpdate({_id:taskID}, req.body, {
        new: true,
        runValidators: true
    })
    if(!task){
        return next(createCustomError(`Task With ID ${taskID} Not Found`, 404))
    }    
    res.status(200).json({task})
})
module.exports.deleteTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params
    const task = await TaskModel.findOneAndDelete({_id:taskID})
    if(!task){
        return next(createCustomError(`Task With ID ${taskID} Not Found`, 404))
    }
    return res.status(200).json({success:true})
})
