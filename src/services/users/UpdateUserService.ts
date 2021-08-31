import prisma from "../../configs/prisma"


interface IRequest {
  uuid: string
  newData: JSON
  loggedUserId: string
}

export class UpdateUserService {
  async run({ uuid, newData, loggedUserId }: IRequest) {
    const newRecord = await prisma.user.update({
      where: {
        uuid
      },
      data: { ...newData, updateBy: loggedUserId }
    })
    return newRecord
  }
}
