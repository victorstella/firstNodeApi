import { User_Address, User } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface IRequest {
  newRecord: User & { address: User_Address }
}

export class CreateUserService {
  async run({ newRecord }: IRequest) {
    const { uuid, email, name, address } = newRecord
    const user = await prisma.user.create({
      data: {
        uuid,
        email,
        name,
        address: {
          create: {
            user_address: address!.user_address
          }
        }
      },
      include: {
        address: true
      }
    })
    return user
  }
}