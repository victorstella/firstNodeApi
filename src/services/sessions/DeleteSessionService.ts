import { User } from "@prisma/client"
import redis from "../../configs/redis"

interface IRequest {
  userLoggedOut: User
}

export class DeleteSessionService {
  async run({ userLoggedOut }: IRequest) {
    await redis.del(userLoggedOut.name)

    redis.on("error", (error) => {
      console.error(error)
    })

    return { auth: false, token: null }
  }
}