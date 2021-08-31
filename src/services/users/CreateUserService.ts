import { User_Address, User } from "@prisma/client"
import prisma from "../../configs/prisma"
import redis from "../../configs/redis"

interface IRequest {
  newRecord: User & { address: User_Address }
  loggedUserId: string
}

export class CreateUserService {
  async run({ newRecord, loggedUserId }: IRequest) {
    const { uuid, email, name, address } = newRecord
    const sqlUser = await prisma.user.create({
      data: {
        uuid,
        email,
        name,
        address: {
          create: {
            user_address: address!.user_address
          }
        },
        createdBy: loggedUserId,
      },
      include: {
        address: true
      }
    })

    return sqlUser
  }
}
