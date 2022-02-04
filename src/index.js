const express = require('express');
require('./db/mongoose');
const User = require('./db/models/user')
const Task = require('./db/models/task')
const validator = require('validator')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());


// Users routes

app.post('/users', (req, res) => {
  const user = new User(req.body)
  user.save()
    .then(() => {
      res.send(user)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
    res.send(users)
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.get('/users/:id', (req, res) => {
  const _id = req.params.id
  User.findById(_id)
    .then((user) => {
      if (!user) return res.status(404).send()
      res.send(user)
    }).catch((error) => {
      res.status(500).send(error)
    })
})

app.patch('/users/:id', (req, res) => {
  const updates = Object.keys(req.body)
  const permittedUpdates = ["name", "email", "password"]
  const isValid = updates.every((update) => permittedUpdates.includes(update))

  if (!isValid) {
    return res.status(400).send({error: "Invalid updates."})
  }

  User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  .then((user) => {
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  }).catch((error) => {
    res.status(400).send(error)
  })
})

app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send()
      }
      res.send(user)
    }).catch((error) => {
      res.status(500).send
    })
})

// Tasks routes

app.post('/tasks', (req, res) => {
  const task = new Task(req.body)
  task.save()
    .then(() => {
      res.send(task)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
})

app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks)
    }).catch((error) => {
      res.status(500).send(error)
    })
})

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id
  Task.findById(_id)
    .then((task) => {
      if (!task) return res.status(404).send()
      res.send(task)
    }).catch((error) => {
      res.status(500).send(error)
    })
})

app.patch('/tasks/:id', (req, res) => {
  const updates = Object.keys(req.body)
  const permittedUpdates = ["title", "completed"]
  const isValid = updates.every((update) => {permittedUpdates.includes(update)})

  if (!isValid) {
    return res.status(400).send({error: "Invalid updates."})
  }

  Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    .then((task) => {
      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
    }).catch((error) => {
      res.status(400).send(error)
    })
})

app.delete('/tasks/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (!task) {
        return res.status(404).send()
      }
      res.send(task)
    }).catch((error) => {
      res.status(500).send
    })
})

app.listen(port, () => {
  console.log("Hello!")
})



// 'Challenge' bits

const updateAgeAndCount = async (id, age) => {
  await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return count
}


const deleteTaskAndCount = async (id) => {
  await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: false })
  return count
}
