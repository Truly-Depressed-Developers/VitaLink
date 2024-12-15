import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Person = {
  id: string;
  name: string;
  heartRate: number;
  bloodPressure: number;
  sleepScore: number;
};

export interface Reminder {
  name: string;
  time: string;
  days: string;
  active: boolean;
}

export type Medicine = Reminder;
export type Doctors = Reminder;