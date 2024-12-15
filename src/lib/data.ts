import { type Doctors, type Medicine, type Person } from "./utils";

export const people: Person[] = [
  {
    id: "1",
    name: "Babcia Krysia",
    heartRate: 65,
    bloodPressure: 155,
    sleepScore: 45,
  },
  {
    id: "2",
    name: "Dziadek Janek",
    heartRate: 70,
    bloodPressure: 160,
    sleepScore: 60,
  },
  {
    id: "3",
    name: "Mama Ania",
    heartRate: 75,
    bloodPressure: 135,
    sleepScore: 85,
  },
  {
    id: "4",
    name: "Tata Kuba",
    heartRate: 80,
    bloodPressure: 170,
    sleepScore: 60,
  },
];

export const medicines: Medicine[] = [
  { name: "Rutinoscorbin", time: "8:00", days: "Pon, Śr, Pt", active: true },
  { name: "Absenor", time: "10:00", days: "Codziennie", active: true },
  {
    name: "Aciclovir Aurovitas",
    time: "11:00",
    days: "Codziennie",
    active: false,
  },
];

export const doctors: Doctors[] = [
  {
    name: "Wizyta u neurologa (NFZ)",
    time: "12:00",
    days: "Raz, 21.12.2024",
    active: true,
  },
];
