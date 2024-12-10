import { getHashIn } from "./getHash";

export const getStarForDate = (date: Date, seedNumber: number): number => {
  const d = Math.floor(date.getTime() / 86400000);
  return getHashIn(
    {
      name: "star",
      setLength: 1,
      seedNumber,
    },
    d,
    5,
  )[0];
};
