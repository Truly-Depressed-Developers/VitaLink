import { PrismaClient } from '@prisma/client';
import { addDays, subDays, subHours, setHours, setMinutes } from 'date-fns';

const prisma = new PrismaClient()

async function main() {
  await prisma.healthData.deleteMany()
  await prisma.medicine.deleteMany() 
  await prisma.doctor.deleteMany()
  await prisma.person.deleteMany()

  const babcia = await prisma.person.create({
    data: {
      name: "Babcia Krysia",
      heartRate: 65,
      bloodPressure: 155,
      sleepScore: 45,
    }
  })

  const dziadek = await prisma.person.create({
    data: {
      name: "Dziadek Janek", 
      heartRate: 70,
      bloodPressure: 160,
      sleepScore: 60,
    }
  })

  await prisma.medicine.createMany({
    data: [
      {
        name: "Rutinoscorbin",
        time: "8:00",
        days: "Pon, Śr, Pt",
        active: true,
        personId: babcia.id
      },
      {
        name: "Absenor",
        time: "10:00", 
        days: "Codziennie",
        active: true,
        personId: babcia.id
      },
      {
        name: "Aciclovir Aurovitas",
        time: "11:00",
        days: "Codziennie", 
        active: false,
        personId: dziadek.id
      }
    ]
  })

  await prisma.doctor.createMany({
    data: [
      {
        name: "Wizyta u neurologa (NFZ)",
        time: "12:00",
        days: "Raz, 21.12.2024",
        active: true,
        personId: babcia.id
      },
      {
        name: "Kontrola kardiologiczna",
        time: "14:30",
        days: "Raz, 15.03.2024",
        active: true,
        personId: dziadek.id
      }
    ]
  })

  const now = new Date()
  const healthData = []

  for (let i = 0; i < 30; i++) {
    const day = subDays(now, i)
    
    for (let h = 0; h < 24; h++) {
      const time = subHours(setMinutes(setHours(day, h), 0), 0)
      
      healthData.push({
        personId: babcia.id,
        date: time,
        heartRate: Math.floor(Math.random() * (75 - 55) + 55),
        bloodPressure: Math.floor(Math.random() * (160 - 150) + 150),
        sleepHours: Math.random() * (8 - 6) + 6,
        steps: Math.floor(Math.random() * (5000 - 2000) + 2000),
        deepSleep: Math.floor(Math.random() * (120 - 60) + 60),
        bloodOxygen: Math.random() * (100 - 95) + 95,
        sleepStart: subHours(time, Math.floor(Math.random() * (8 - 6) + 6)),
        sleepEnd: time,
        totalSleep: Math.random() * (8 - 6) + 6,
      })

      healthData.push({
        personId: dziadek.id,
        date: time,
        heartRate: Math.floor(Math.random() * (80 - 60) + 60),
        bloodPressure: Math.floor(Math.random() * (170 - 155) + 155),
        sleepHours: Math.random() * (9 - 5) + 5,
        steps: Math.floor(Math.random() * (6000 - 3000) + 3000),
        deepSleep: Math.floor(Math.random() * (150 - 90) + 90),
        bloodOxygen: Math.random() * (100 - 95) + 95,
        sleepStart: subHours(time, Math.floor(Math.random() * (9 - 5) + 5)),
        sleepEnd: time,
        totalSleep: Math.random() * (9 - 5) + 5,
      })
    }
  }

  await prisma.healthData.createMany({
    data: healthData
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })