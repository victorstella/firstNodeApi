import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import authMiddleware from '../middlewares/auth'

const usersController = new UsersController()
const rUsers = Router()

rUsers
  .post('/', authMiddleware, usersController.create)
  .get('/:uuid', authMiddleware, usersController.show)
  .get('/', authMiddleware, usersController.index)
  .patch('/:uuid', authMiddleware, usersController.update)
  .delete('/:uuid', authMiddleware, usersController.delete)

export default rUsers