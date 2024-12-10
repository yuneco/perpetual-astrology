import { useMemo, useEffect } from "react";
import type { Seed } from "./defs/Seed";
import { isZodiacSignId } from "./defs/zodiacSign";

type LocProps = {
  seed?: Seed;
  dayNo?: number;
};

const getLocationSeed = (): LocProps => {
  const hash = window.location.hash;
  if (!hash) return {};
  const [name, sign, dayNo] = hash.slice(1).split("/");
  if (!isZodiacSignId(sign)) return {};
  const seed: Seed = {
    userName: decodeURIComponent(name),
    sign: sign,
  };
  if (!dayNo) return { seed };
  return { seed, dayNo: Number(dayNo) };
};

export const initialLoc = getLocationSeed();

export const useAutoSetLocation = ({ seed, dayNo }: LocProps) => {
  const locHash = useMemo(() => {
    if (!seed) return "";
    const name = seed.userName;
    const sign = seed.sign;
    if (dayNo === undefined) return `#${name}/${sign}`;
    return `#${name}/${sign}/${dayNo}`;
  }, [seed, dayNo]);
  useEffect(() => {
    window.location.hash = locHash;
  }, [locHash]);
};
