import { Router } from "express"
import authMiddleware from "../middlewares/auth"
import rSessions from "./sessions.routes"
import rUsers from "./users.routes"

const routes = Router()

routes
  .use("/users", authMiddleware, rUsers)
  .use("/sessions", rSessions)

export default routes
