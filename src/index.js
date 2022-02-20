const express = require('express');
require('./db/mongoose');
const User = require('./models/user')
const Task = require('./models/task')
const validator = require('validator')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')
const path = require('path')
const hbs = require('hbs')

function pathGen(pathString) {
  return path.join(__dirname, pathString)
}

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', pathGen('../templates/views'))
hbs.registerPartials(pathGen('../templates/partials'))

app.use(express.static(pathGen('../public')))

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.get('', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log("Hello!")
})
