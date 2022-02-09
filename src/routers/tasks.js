const express = require('express');
require('../db/mongoose');
const Task = require('../db/models/task')

const taskRouter = new express.Router();

taskRouter.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task.save()
    .then((task) => {
      res.send(task)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

taskRouter.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks)
    }).catch((error) => {
      res.status(500).send(error)
    })
})

taskRouter.get('/tasks/:id', (req, res) => {
  const _id = req.params.id
  Task.findById(_id)
    .then((task) => {
      if (!task) return res.status(404).send()
      res.send(task)
    }).catch((error) => {
      res.status(500).send(error)
    })
})

taskRouter.patch('/tasks/:id', (req, res) => {
  const updates = Object.keys(req.body)
  const permittedUpdates = ["title", "completed"]
  const isValid = updates.every((update) => {
    return permittedUpdates.includes(update)
  })

  console.log(req.body)

  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." })
  }

  Task.findById(req.params.id)
    .then((task) => {
      updates.forEach((update) => {
        task[update] = req.body[update]
      })
      return task.save()
    })
    .then((task) => {
      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
    }).catch((error) => {
      res.status(500).send(error)
    })
})

taskRouter.delete('/tasks/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
    }).catch((error) => {
      res.status(500).send()
    })
})

module.exports = taskRouter
