import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface IRequest {
  uuid: string,
  newData: JSON
}

export class UpdateUserService {
  async run({ uuid, newData }: IRequest) {
    const newRecord = await prisma.user.update({
      where: {
        uuid
      },
      data: { ...newData }
    })
    return newRecord
  }
}