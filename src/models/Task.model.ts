import Joi from 'joi'
import mongoose from 'mongoose'
const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'must provide name'],
      trim: true,
      maxlength: [20, 'name can not be more than 20 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Task', TaskSchema)

export function validateCreateTask(task: any) {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    completed: Joi.boolean(),
  })
  return schema.validate(task)
}

export function validateUpdateTask(task: any) {
  const schema = Joi.object({
    name: Joi.string().max(50),
    completed: Joi.boolean(),
  })
  return schema.validate(task)
}
