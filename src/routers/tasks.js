const express = require('express');
require('../db/mongoose');
const Task = require('../models/task')
const authenticate = require('../middleware/authenticate')

const taskRouter = new express.Router();

taskRouter.post('/tasks', authenticate, (req, res) => {
  // const task = new Task(req.body)

  const task = new Task({
    ... req.body,
    userId: req.user._id
  })

  task.save()
    .then((task) => {
      res.status(201).send(task)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

taskRouter.get('/tasks', authenticate, (req, res) => {
  req.user.populate('tasks').execPopulate()
    .then((user) => {
      res.send({user, "tasks": user.tasks})
    }).catch((error) => {
      res.status(500).send(error)
    })
})

taskRouter.get('/tasks/:id', authenticate, (req, res) => {
    Task.findOne({ _id: req.params.id, userId: req.user._id })
      .then((task) => {
        if (!task) return res.status(404).send()
        res.send(task)
      }).catch((error) => {
        res.status(500).send(error)
      })
})

taskRouter.patch('/tasks/:id', authenticate, (req, res) => {
  const updates = Object.keys(req.body)
  const permittedUpdates = ["title", "completed"]
  const isValid = updates.every((update) => {
    return permittedUpdates.includes(update)
  })


  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." })
  }

  Task.findOne({ _id: req.params.id, userId: req.user._id })
    .then((task) => {
      if (!task) {
        return res.status(404).send()
      }
      updates.forEach((update) => {
        task[update] = req.body[update]
      })
      return task.save()
    })
    .then((task) => {
      res.send(task)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})

taskRouter.delete('/tasks/:id', authenticate, (req, res) => {
  Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
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
