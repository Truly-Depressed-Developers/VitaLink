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

export type Medicine = {
  name: string;
  time: string;
  days: string;
  active: boolean;
};

export type Doctors = {
  name: string;
  time: string;
  days: string;
  active: boolean;
};
