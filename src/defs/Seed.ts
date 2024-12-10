import { MersenneTwister } from "../logics/MersenneTwister";

export type Seed = {
  userName: string;
  sign: string;
};

export const DEFAULT_SEED: Seed = {
  userName: "名無し",
  sign: "aries",
};

export const seedToNumber = (seed: Seed): number => {
  const seedText = `${seed.userName}${seed.sign}`;
  const n = seedText.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const mt = new MersenneTwister(n);
  return (mt.random() * 100000) | 0;
};
