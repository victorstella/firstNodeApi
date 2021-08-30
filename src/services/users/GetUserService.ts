import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface IRequest {
  uuid: string
}

export class GetUserService {
  async runShow({ uuid }: IRequest) {
    const user = await prisma.user.findUnique({
      where: {
        uuid
      }
    })
    return user
  }

  async runIndex() {
    return await prisma.user.findMany()
  }
}