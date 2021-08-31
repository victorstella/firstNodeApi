import { Request, Response } from "express"
import { CreateUserService } from "../services/users/CreateUserService"
import { GetUserService } from "../services/users/GetUserService"
import { UpdateUserService } from "../services/users/UpdateUserService"
import { DeleteUserService } from "../services/users/DeleteUserService"
import redis from "../configs/redis"

const createUserService = new CreateUserService()
const getUserService = new GetUserService()
const patchUserService = new UpdateUserService()
const deleteUserService = new DeleteUserService()

// Controllers devem apenas gerenciar a requisição (receber, delegar e retornar)
class UsersController {
  async create(req: Request, res: Response) {
    // alimentado pelo middleware
    const newRecord = req.body
    const loggedUserId = req.user.uuid
    const newUser = await createUserService.run({ newRecord, loggedUserId })
    await redis.del('users-list')

    res.json(newUser)

    const users = await getUserService.runIndex()
    await redis.set('users-list', JSON.stringify(users))

    return
  }

  async show(req: Request, res: Response) {
    const uuid = req.params.uuid
    const user = await getUserService.runShow({ uuid })
    return res.json(user)
  }

  async index(req: Request, res: Response) {
    const cachedUsersList = await redis.get('users-list')
    if (cachedUsersList) {
      return res.json(JSON.parse(cachedUsersList))
    }
    const users = await getUserService.runIndex()
    await redis.set('users-list', JSON.stringify(users))
    return res.json(users)
  }

  async update(req: Request, res: Response) {
    const uuid = req.params.uuid
    const newData = req.body
    const upUser = await patchUserService.run({ uuid, newData, loggedUserId: req.user.uuid })
    // invalida o cache (deleta a lista do Redis)
    await redis.del('users-list')
    return res.json(upUser)
  }

  async delete(req: Request, res: Response) {
    const uuid = req.params.uuid
    const delUser = await deleteUserService.run({ uuid })
    // invalida o cache (deleta a lista do Redis)
    await redis.del('users-list')
    return res.json(delUser)
  }
}

export default UsersController
