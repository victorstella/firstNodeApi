import jwt from 'jsonwebtoken'
import redis from "../../configs/redis"

interface IRequest {
  user: string,
  password: string
}

export class CreateSessionService {
  async run({ user, password }: IRequest) {
    if (user === 'victor' && password === 'opa') {
      const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '1d'
      })
      await redis.set(user, token, "EX", 84600)
      await redis.get(user)

      redis.on("error", (error) => {
        console.error(error)
      })

      return { auth: true, token: token }
    }

    return { message: 'Login inválido!' }
  }
}