import { Router } from "express"
import rSessions from "./sessions.routes"
import rUsers from "./users.routes"

const routes = Router()

routes
  .use("/users", rUsers)
  .use("/sessions", rSessions)

export default routes
