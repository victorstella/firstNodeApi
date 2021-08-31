import { Router } from "express"
import SessionsController from "../controllers/SessionsController"

const sessionsController = new SessionsController()
const rSessions = Router()

rSessions
  .post("/login", sessionsController.login)
// normalmente logout é feito no front (destruindo o token)

// * Estratégia de RefreshToken
// >> token: Token JWT (não armazenado no back | armazenado no front)
// >> refresh token: Uuid ( armazenado no back )

// * se tiver refresh token, dois usuários na mesma conta não será possível?
// * um irá inativar o outro ?? CONFIRMAR!

export default rSessions
