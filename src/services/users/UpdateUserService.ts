import prisma from "../../configs/prisma"


interface IRequest {
  uuid: string
  newData: JSON
  loggedUser: string
}

export class UpdateUserService {
  async run({ uuid, newData, loggedUser }: IRequest) {
    const newRecord = await prisma.user.update({
      where: {
        uuid
      },
      data: { ...newData, updateBy: loggedUser }
    })
    return newRecord
  }
}
