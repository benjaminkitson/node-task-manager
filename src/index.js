const express = require('express');
require('./db/mongoose');
const User = require('./db/models/user')
const Task = require('./db/models/task')
const validator = require('validator')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

// Users routes


// Tasks routes


app.listen(port, () => {
  console.log("Hello!")
})
