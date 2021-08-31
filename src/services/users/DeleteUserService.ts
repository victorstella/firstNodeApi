import prisma from "../../configs/prisma"

interface IRequest {
  uuid: string
}

export class DeleteUserService {
  async run({ uuid }: IRequest) {
    await prisma.$executeRaw(`DELETE FROM User WHERE uuid=${uuid}`)
    return uuid
  }
}