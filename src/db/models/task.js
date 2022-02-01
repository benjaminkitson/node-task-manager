const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
  title:
    {
      type: String,
      required: true,
      minlength: 2,
    },
  completed:
    {
      type: Boolean,
      default: false
    }
})

module.exports = Task
