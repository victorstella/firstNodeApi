import prisma from "../../configs/prisma"

interface IRequest {
  uuid: string
}

export class DeleteUserService {
  async run({ uuid }: IRequest) {
    const deleteUserAddress = prisma.user_Address.deleteMany({
      where: {
        user_id: uuid
      }
    })

    const deleteUser = prisma.user.delete({
      where: {
        uuid: uuid
      }
    })
    const deleteTransaction = await prisma.$transaction([deleteUserAddress, deleteUser])
    return deleteTransaction[1]
  }
}