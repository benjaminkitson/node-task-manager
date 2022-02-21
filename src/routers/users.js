const express = require('express');
require('../db/mongoose');
const User = require('../models/user')
const authenticate = require('../middleware/authenticate')

const userRouter = new express.Router();


userRouter.post('/users', (req, res) => {
  let user;
  let token;
  const newUser = new User(req.body)
  newUser.save()
    .then((result) => {
      user = result
      return user.generateAuthToken()
    })
    .then((result) => {
      token = result
      res.status(201).send({user, token})
    })
    .catch((error) => {
      res.status(500).send(error)
    })
})


userRouter.post('/users/login', (req, res) => {
  let user;
  let token;
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


userRouter.post('/users/logout', authenticate, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    console.log(req.user.tokens)
    await req.user.save()

    res.send()
  } catch(e) {
    res.status(500).send()
  }
})


userRouter.post('/users/logoutall', authenticate, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})


userRouter.get('/users/me', authenticate, (req, res) => {
  console.log("stinky")
  res.status(200).send(req.user)
})


// Not useful for the task app, but could be for others - the same goes for getting all users

// userRouter.get('/users/:id', authenticate, (req, res) => {
//   const _id = req.params.id
//   User.findById(_id)
//     .then((user) => {
//       if (!user) return res.status(404).send()
//       res.send(user)
//     }).catch((error) => {
//       res.status(500).send(error)
//     })
// })


userRouter.patch('/users/me', authenticate, (req, res) => {
  const updates = Object.keys(req.body)
  const permittedUpdates = ["name", "email", "password"]
  const isValid = updates.every((update) => {
    return permittedUpdates.includes(update)
  })

  if (!isValid) {
    return res.status(400).send({ error: "Invalid updates." })
  }

    updates.forEach((update) => {
      req.user[update] = req.body[update]
    })
    req.user.save()
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


userRouter.delete('/users/me', authenticate, (req, res) => {
  req.user.remove()
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }
      res.send(req.user)
    }).catch((error) => {
      res.status(500).send()
    })
})

module.exports = userRouter
