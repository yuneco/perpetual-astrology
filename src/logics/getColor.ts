import { getHashIn } from "./getHash";

export const getColorForDate = (
  date: Date,
  seedNumber: number,
): [string, string] => {
  const d = Math.floor(date.getTime() / 86400000);

  const [r, g, b] = getHashIn(
    {
      name: "color",
      setLength: 3,
      seedNumber,
    },
    d,
    256,
  ); // rgb
  // bg color luminance
  const l = 0.299 * r + 0.587 * g + 0.114 * b;
  // fore color: black or white
  const fg = l > 128 ? "#000000" : "#ffffff";

  // return as #Hex
  const bg = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  return [bg, fg];
};
