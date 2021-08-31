import { Request, Response } from "express"
import { CreateSessionService } from "../services/sessions/CreateSessionService"

const createSessionService = new CreateSessionService()

class SessionsController {
  async login(req: Request, res: Response) {
    const login = await createSessionService.run(req.body)
    if (login.auth) {
      return res.status(200).json(login)
    }
    return res.status(401).json(login)
  }
}

export default SessionsController