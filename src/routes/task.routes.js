const express = require('express')
const router = express.Router()
const Task = require('../models/task')

router
    .post('/', async (req, res) => {
        const { title , description }= req.body
        const task = new Task({  title, description })
        await task.save()
        res.json({
            status: 'Task Saved!'
        })
    })

    .get('/', async (req, res) => {
        const tasks = await Task.find()
        res.json(tasks)
    })

    .get('/:id', async (req, res) => {
        const { id } = req.params
        const task = await Task.findById(id)
        res.json(task)
    })

    .put('/:id', async (req, res) => {
        const { title, description } = req.body
        const newTask = { title, description }
        await Task.findByIdAndUpdate(req.params.id, newTask)
        res.json({
            status: 'Task Updated!'
        })
    })

    .delete('/:id', async(req, res) => {
        const { id } = req.params
        await Task.findByIdAndRemove(id)
        res.json({
            status: 'Task Deleted!'
        }) 
    })

module.exports = router