const express = require('express');
require('../db/mongoose');
const User = require('../db/models/user')

const userRouter = new express.Router();

userRouter.post('/users', (req, res) => {
  const user = new User(req.body)
  user.save()
    .then((user) => {
      res.send(user)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})


userRouter.post('/users/login', (req, res) => {
  let user
  let token
  User.findByCredentials(req.body.email, req.body.password)
    .then((result) => {
      user = result
      return user.generateAuthToken()
    })
    .then((result) => {
      token = result
      res.send({user, token})
    })
    .catch((error) => {
      res.status(400).send(error)
    })
})


userRouter.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users)
    }).catch((error) => {
      res.status(500).send(error)
    })
})


userRouter.get('/users/:id', (req, res) => {
  const _id = req.params.id
  User.findById(_id)
    .then((user) => {
      if (!user) return res.status(404).send()
      res.send(user)
    }).catch((error) => {
      res.status(500).send(error)
    })
})


userRouter.patch('/users/:id', (req, res) => {
  const updates = Object.keys(req.body)
  const permittedUpdates = ["name", "email", "password"]
  const isValid = updates.every((update) => {
    return permittedUpdates.includes(update)
  })

  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." })
  }

  User.findById(req.params.id)
    .then((user) => {
      updates.forEach((update) => {
        user[update] = req.body[update]
      })
      return user.save()
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }
      res.send(user)
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})


userRouter.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }
      res.send(user)
    }).catch((error) => {
      res.status(500).send()
    })
})

module.exports = userRouter
