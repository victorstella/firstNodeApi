import { Request, Response } from "express"
import { CreateSessionService } from "../services/sessions/CreateSessionService"
import { DeleteSessionService } from "../services/sessions/DeleteSessionService"

const createSessionService = new CreateSessionService()
const deleteSessionService = new DeleteSessionService()

class SessionsController {
  async login(req: Request, res: Response) {
    const login = await createSessionService.run(req.body)
    if (login.auth) {
      return res.status(200).json(login)
    }
    return res.status(401).json(login)
  }

  async logout(req: Request, res: Response) {
    const userLoggedOut = req.body
    const logout = await deleteSessionService.run({ userLoggedOut })
    return res.json(logout)
  }
}

export default SessionsController