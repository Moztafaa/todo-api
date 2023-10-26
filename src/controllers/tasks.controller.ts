import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Task, {
  validateCreateTask,
  validateUpdateTask,
} from '../models/Task.model'

export const getAllTasks = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const tasks = await Task.find({})
    if (tasks.length === 0) {
      return res.status(200).json({ msg: 'No tasks found' })
    } else {
      res.status(200).json({ tasks })
    }
  }
)

export const createTask = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { error } = validateCreateTask(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }
    const task = await Task.create(req.body)
    res.status(201).json({ task })
  }
)

export const getSingleTask = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${req.params.id}` })
    }
    res.status(200).json({ task })
  }
)

export const deleteTask = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const task = await Task.findByIdAndRemove(req.params.id)
    if (!task) {
      return res.status(404).json({ msg: `No task with id ${req.params.id}` })
    }
    res.status(200).json({ task })
  }
)

export const updateTask = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { error } = validateUpdateTask(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    })

    if (!task) {
      return res.status(404).json({ msg: `No task with id ${taskID}` })
    }
    res.status(200).json({ task })
  }
)
