import { Request, Response } from "express"
import { CreateUserService } from "../services/users/CreateUserService"
import { GetUserService } from "../services/users/GetUserService"
import { UpdateUserService } from "../services/users/UpdateUserService"
import { DeleteUserService } from "../services/users/DeleteUserService"

const createUserService = new CreateUserService()
const getUserService = new GetUserService()
const patchUserService = new UpdateUserService()
const deleteUserService = new DeleteUserService()

// Controllers devem apenas gerenciar a requisição (receber, delegar e retornar)
class UsersController {
  async create(req: Request, res: Response) {
    const newRecord = req.body
    const newUser = await createUserService.run({ newRecord })
    return res.json(newUser)
  }

  async show(req: Request, res: Response) {
    const uuid = req.params.uuid
    const user = await getUserService.runShow({ uuid })
    return res.json(user)
  }

  async index(req: Request, res: Response) {
    const user = await getUserService.runIndex()
    return res.json(user)
  }

  async update(req: Request, res: Response) {
    const uuid = req.params.uuid
    const newData = req.body
    const upUser = await patchUserService.run({ uuid, newData })
    return res.json(upUser)
  }

  async delete(req: Request, res: Response) {
    const uuid = req.params.uuid
    const delUser = await deleteUserService.run({ uuid })
    return res.json(delUser)
  }
}

export default UsersController