import prisma from './db'
import { cache } from 'react'

import { Person, Medicine, Doctor, HealthData } from '@prisma/client'

export type PersonWithRelations = Person & {
  medicines: Medicine[]
  doctors: Doctor[]
  healthData: HealthData[]
}

export const getPeople = cache(async (): Promise<PersonWithRelations[]> => {
  return await prisma.person.findMany({
    include: {
      medicines: true,
      doctors: true,
      healthData: {
        orderBy: {
          date: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      name: 'asc'
    }
  })
})

export const getHealthData = cache(async (personId: string) => {
    return await prisma.healthData.findMany({
      where: { personId },
      orderBy: { date: 'desc' },
      take: 1,
    });
});
  
export const getPerson = cache(async (id: string) => {
    return await prisma.person.findUnique({
        where: { id },
    });
});

export const getMedicines = cache(async (personId: string) => {
  return await prisma.medicine.findMany({
    where: { personId }
  })
})

export const getDoctors = cache(async (personId: string) => {
  return await prisma.doctor.findMany({
    where: { personId }
  })
})