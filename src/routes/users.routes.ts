import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import authMiddleware from '../middlewares/auth'

const usersController = new UsersController()
const rUsers = Router()

rUsers
  .post('/', usersController.create)
  .get('/:uuid', usersController.show)
  .get('/', usersController.index)
  .patch('/:uuid', usersController.update)
  .delete('/:uuid', usersController.delete)

export default rUsers
