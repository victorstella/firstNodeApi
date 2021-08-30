import { Router } from "express"
import SessionsController from "../controllers/SessionsController"
import authMiddleware from "../middlewares/auth"

const sessionsController = new SessionsController()
const rSessions = Router()

rSessions
  .post("/login", sessionsController.login)
  .post("/logout", authMiddleware, sessionsController.logout)

export default rSessions