import prisma from "../src/configs/prisma"

async function seed() {
  const victor = await prisma.user.upsert({
    where: { uuid: '1' },
    update: {},
    create: {
      uuid: '1',
      email: 'example@example.com',
      name: 'victor',
      createdBy: '1',
      updateBy: '1'
    },
  })
  console.log(victor)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

export default seed