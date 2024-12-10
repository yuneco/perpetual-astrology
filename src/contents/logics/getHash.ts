import { MersenneTwister } from "./MersenneTwister";

const UNIT = 1000;
type HashUnit = {
  unitNo: number;
  seedNumber: number;
  values: number[][];
};
const cache: Record<string, HashUnit | undefined> = {};

type HashCategory = Readonly<{
  /** category name */
  name: string;
  /** hash count for each index */
  setLength: number;
  /** seed number */
  seedNumber: number;
}>;

/**
 * return hash value for input index.
 * @param cat hash category
 * @param index index in category
 * @returns hash value
 */
export const getHash = (cat: HashCategory, index: number): number[] => {
  const mod = index % UNIT;
  const unitNo = Math.floor(index / UNIT);

  const { name, setLength, seedNumber } = cat;

  if (
    cache[name]?.unitNo === unitNo &&
    cache[name]?.seedNumber === seedNumber
  ) {
    return cache[name].values[mod];
  }

  const mt = new MersenneTwister(seedNumber * (unitNo + 1));
  const getValueSet = () =>
    Array.from({ length: setLength }, () => mt.random());
  const values = Array.from({ length: UNIT }, () => getValueSet());
  cache[name] = {
    unitNo,
    seedNumber,
    values,
  };
  return values[mod];
};

/**
 * return random int value for input n.
 * @param cat hash category
 * @param n No in category
 * @param m max int value to return
 * @returns random int value for input n
 */
export const getHashIn = (
  cat: HashCategory,
  n: number,
  m: number,
): number[] => {
  const vals = getHash(cat, n);
  return vals.map((v) => Math.floor(v * (m + 1)));
};
