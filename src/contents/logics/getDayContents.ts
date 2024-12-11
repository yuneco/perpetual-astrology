import { dateForNo } from "./dateForNo";
import { getColorForDate } from "./getColor";
import { getMenuForDate } from "./getMenu";
import { getMoon } from "./getMoon";
import { getStarForDate } from "./getStar";
import { generateUUIDv4 } from "./getUuid";

export type DayContents = {
  dayNo: number;
  date: Date;
  dayOfWeekStr: string;
  dayColor: "colors.sun" | "colors.sat" | "colors.body";
  moon: string;
  rating: number;
  luckyColor: string;
  luckyTextColor: string;
  luckyMenu: string;
  luckyUuid: string;
};

export const getDayContents = (
  dayNo: number,
  seedNumber: number,
): DayContents => {
  const date = dateForNo(dayNo);
  const dayOfWeek = date.getDay();
  const dayStr = ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek];
  const dayColor =
    dayOfWeek === 0
      ? "colors.sun"
      : dayOfWeek === 6
        ? "colors.sat"
        : "colors.body";
  const moon = getMoon(date);
  const rating = getStarForDate(date, seedNumber);
  const [luckyColor, luckyTextColor] = getColorForDate(date, seedNumber);
  const luckyMenu = getMenuForDate(date, seedNumber);
  const luckyUuid = generateUUIDv4(dayNo, seedNumber);
  return {
    dayNo,
    date,
    dayOfWeekStr: dayStr,
    dayColor,
    moon,
    rating,
    luckyColor,
    luckyTextColor,
    luckyMenu,
    luckyUuid,
  };
};
