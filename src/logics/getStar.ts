import { getHashIn } from "./getHash";

export const getStarForDate = (date: Date): number => {
  const d = Math.floor(date.getTime() / 86400000);
  return getHashIn("star", 1, d, 5)[0];
};
