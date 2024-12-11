import { MersenneTwister } from "../contents/logics/MersenneTwister";
import { zodiacSigns, type ZodiacSignId } from "./zodiacSign";

export type Seed = Readonly<{
  userName: string;
  sign: ZodiacSignId;
}>;

export const DEFAULT_SEED: Seed = {
  userName: "ねこかわいい",
  sign: zodiacSigns[0].id,
};

export const seedToNumber = (seed: Seed): number => {
  const seedText = `${seed.userName}${seed.sign}`;
  const n = seedText.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const mt = new MersenneTwister(n);
  return (mt.random() * 100000) | 0;
};
