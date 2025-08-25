import { PrismaClient, CategoryType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Get existing user
  const user = await prisma.user.findUnique({
    where: { id: 3 },
  })

  if (!user) {
    throw new Error('User with id 1 not found')
  }

  // Create categories for existing user
  const categories = await Promise.all([
    prisma.category.upsert({
      where: {
        name_userId: {
          name: 'Food',
          userId: user.id,
        },
      },
      update: {},
      create: {
        name: 'Food',
        type: CategoryType.LOSS,
        userId: user.id,
      },
    }),
    prisma.category.upsert({
      where: {
        name_userId: {
          name: 'Transport',
          userId: user.id,
        },
      },
      update: {},
      create: {
        name: 'Transport',
        type: CategoryType.LOSS,
        userId: user.id,
      },
    }),
  ])

  // Create sprints for existing user
  const sprints = await Promise.all([
    prisma.sprint.upsert({
      where: {
        id: 1,
      },
      update: {},
      create: {
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-31'),
        startSum: 100000, // 1000.00 in cents
        userId: user.id,
      },
    }),
    prisma.sprint.upsert({
      where: {
        id: 2,
      },
      update: {},
      create: {
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-30'),
        startSum: 100000, // 1000.00 in cents
        userId: user.id,
      },
    }),
  ])

  // Create envelopes with transactions for each sprint
  await Promise.all(
    sprints.flatMap((sprint) =>
      categories.map((category) =>
        prisma.envelope.create({
          data: {
            amount: 50000, // 500.00 in cents
            categoryId: category.id,
            sprintId: sprint.id,
            userId: user.id,
            transactions: {
              create: [
                {
                  amount: -1500, // -15.00 in cents
                  date: new Date(sprint.startDate),
                  comment: 'Grocery shopping',
                  categoryId: category.id,
                  sprintId: sprint.id,
                  userId: user.id,
                },
                {
                  amount: -2500, // -25.00 in cents
                  date: new Date(sprint.startDate.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 days
                  comment: 'Restaurant',
                  categoryId: category.id,
                  sprintId: sprint.id,
                  userId: user.id,
                },
                {
                  amount: -1000, // -10.00 in cents
                  date: new Date(sprint.startDate.getTime() + 14 * 24 * 60 * 60 * 1000), // +14 days
                  comment: 'Snacks',
                  categoryId: category.id,
                  sprintId: sprint.id,
                  userId: user.id,
                },
                {
                  amount: -2000, // -20.00 in cents
                  date: new Date(sprint.startDate.getTime() + 21 * 24 * 60 * 60 * 1000), // +21 days
                  comment: 'Takeout',
                  categoryId: category.id,
                  sprintId: sprint.id,
                  userId: user.id,
                },
                {
                  amount: -3000, // -30.00 in cents
                  date: new Date(sprint.startDate.getTime() + 28 * 24 * 60 * 60 * 1000), // +28 days
                  comment: 'Monthly groceries',
                  categoryId: category.id,
                  sprintId: sprint.id,
                  userId: user.id,
                },
              ],
            },
          },
        })
      )
    )
  )

  console.log('Database has been seeded. 🌱')
  console.log({ user, categories, sprints })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 