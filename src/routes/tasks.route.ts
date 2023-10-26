import { Router } from 'express'
import {
  createTask,
  deleteTask,
  getAllTasks,
  getSingleTask,
  updateTask,
} from '../controllers/tasks.controller'
import validateObjectId from '../middleware/validateObjectId'

export const router = Router()

router.route('/').get(getAllTasks).post(createTask)

router
  .route('/:id')
  .get(validateObjectId, getSingleTask)
  .patch(validateObjectId, updateTask)
  .delete(validateObjectId, deleteTask)
