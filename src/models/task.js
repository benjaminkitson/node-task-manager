const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
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
    },
  userId:
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
},{
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
