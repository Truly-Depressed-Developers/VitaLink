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
