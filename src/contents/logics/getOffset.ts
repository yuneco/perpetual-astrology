import { EPOC, MAX_DAY, ROW_HEIGHT } from "../../defs/appConfig";

const getOffsetPxForDay = (date: Date): number => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const DAYS_FROM_EPOC = (d.getTime() - EPOC.getTime()) / (24 * 60 * 60 * 1000);
  return DAYS_FROM_EPOC * ROW_HEIGHT - window.innerHeight / 2;
};

export const getOffsetPxForToday = (): number => {
  const today = new Date();
  return getOffsetPxForDay(today);
};

export const getOffsetPxForDayNo = (day: number): number => {
  return (
    Math.max(0, Math.min(day, MAX_DAY)) * ROW_HEIGHT - window.innerHeight / 2
  );
};
