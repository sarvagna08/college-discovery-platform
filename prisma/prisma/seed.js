const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.college.deleteMany();

  await prisma.college.createMany({
    data: [
      {
        name: 'IIT Bombay',
        location: 'Mumbai, Maharashtra',
        fees: 200000,
        rating: 4.8,
        courses: ['B.Tech', 'M.Tech', 'PhD'],
        placements: 'Average package 18 LPA, Highest 1.2 CR',
        overview: "One of India's premier engineering institutes."
      },
      {
        name: 'IIT Delhi',
        location: 'New Delhi, Delhi',
        fees: 200000,
        rating: 4.7,
        courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
        placements: 'Average package 16 LPA, Highest 2 CR',
        overview: "Top ranked engineering institute in India's capital."
      },
      {
        name: 'BITS Pilani',
        location: 'Pilani, Rajasthan',
        fees: 500000,
        rating: 4.5,
        courses: ['B.Tech', 'M.Tech', 'MBA'],
        placements: 'Average package 12 LPA, Highest 80 LPA',
        overview: "Premier private engineering university in India."
      },
      {
        name: 'NIT Trichy',
        location: 'Tiruchirappalli, Tamil Nadu',
        fees: 150000,
        rating: 4.3,
        courses: ['B.Tech', 'M.Tech', 'PhD'],
        placements: 'Average package 10 LPA, Highest 45 LPA',
        overview: "One of the top National Institutes of Technology."
      },
      {
        name: 'VIT Vellore',
        location: 'Vellore, Tamil Nadu',
        fees: 400000,
        rating: 4.0,
        courses: ['B.Tech', 'M.Tech', 'MBA', 'PhD'],
        placements: 'Average package 8 LPA, Highest 44 LPA',
        overview: "Large private university with international collaborations."
      },
      {
        name: 'Manipal Institute of Technology',
        location: 'Manipal, Karnataka',
        fees: 450000,
        rating: 3.9,
        courses: ['B.Tech', 'M.Tech', 'MBA'],
        placements: 'Average package 7 LPA, Highest 40 LPA',
        overview: "Well known private engineering college."
      }
    ]
  });
  console.log('Colleges seeded successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());