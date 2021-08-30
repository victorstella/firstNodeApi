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
    console.log('Quem está criado um novo usuário é o user_uuid:', req.user.uuid)
    const newRecord = req.body
    const newUser = await createUserService.run({ newRecord, loggedUser: req.user.uuid })
    // invalida o cache (deleta a lista do Redis)
    await redis.del('list-users')
    return res.json(newUser)
  }

  async show(req: Request, res: Response) {
    const uuid = req.params.uuid
    const user = await getUserService.runShow({ uuid })
    return res.json(user)
  }

  async index(req: Request, res: Response) {
    const cachedUsersList = await redis.get('list-users')
    if(cachedUsersList) {
      return res.json(JSON.parse(cachedUsersList))
    }
    const users = await getUserService.runIndex()
    await redis.set('list-users', JSON.stringify(users))
    return res.json(users)
  }

  async update(req: Request, res: Response) {
    const uuid = req.params.uuid
    const newData = req.body
    const upUser = await patchUserService.run({ uuid, newData, loggedUser: req.user.uuid })
    // invalida o cache (deleta a lista do Redis)
    await redis.del('list-users')
    return res.json(upUser)
  }

  async delete(req: Request, res: Response) {
    const uuid = req.params.uuid
    const delUser = await deleteUserService.run({ uuid })
    // invalida o cache (deleta a lista do Redis)
    await redis.del('list-users')
    return res.json(delUser)
  }
}

export default UsersController
