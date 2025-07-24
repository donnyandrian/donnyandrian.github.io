import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function date(year: number, month: number = 1, day: number = 1) {
    return new Date(year, month - 1, day).getTime();
}

export function countYears(start: number, end: number = Date.now()) {
    const diffTime = Math.abs(end - start);
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const diffYears = diffDays / 365;

    return diffYears;
}
