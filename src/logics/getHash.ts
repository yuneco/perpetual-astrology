export class MersenneTwister {
  private MT: number[] = new Array(624); // 状態配列
  private index = 0;

  constructor(seed: number) {
    this.seedMT(seed);
  }

  // 初期化
  private seedMT(seed: number): void {
    this.MT[0] = seed >>> 0;
    for (let i = 1; i < 624; i++) {
      this.MT[i] =
        (1812433253 * (this.MT[i - 1] ^ (this.MT[i - 1] >>> 30)) + i) >>> 0;
    }
  }

  // 次の乱数を取得
  private generateNumbers(): void {
    for (let i = 0; i < 624; i++) {
      const y =
        (this.MT[i] & 0x80000000) + (this.MT[(i + 1) % 624] & 0x7fffffff);
      this.MT[i] = this.MT[(i + 397) % 624] ^ (y >>> 1);
      if (y % 2 !== 0) {
        this.MT[i] ^= 0x9908b0df;
      }
    }
  }

  // 乱数を取得する
  public random(): number {
    if (this.index === 0) {
      this.generateNumbers();
    }

    let y = this.MT[this.index];
    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    this.index = (this.index + 1) % 624;

    // 0 <= result < 1 の範囲に正規化
    return (y >>> 0) / 4294967296;
  }
}

const UNIT = 1000;
type HashUnit = {
  unitNo: number;
  values: number[][];
};
const cache: Record<string, HashUnit | undefined> = {};

/**
 *
 * @param name category name
 * @param n No in category
 * @returns random number
 */
export const getHash = (name: string, p: number, n: number): number[] => {
  const mod = n % UNIT;
  const unitNo = Math.floor(n / UNIT);

  if (cache[name]?.unitNo === unitNo) {
    return cache[name].values[mod];
  }

  const mt = new MersenneTwister(n); // シードとして n を使用
  const getValueSet = () => Array.from({ length: p }, () => mt.random());
  const values = Array.from({ length: UNIT }, () => getValueSet());
  cache[name] = {
    unitNo,
    values,
  };
  return values[mod];
};

/**
 * return random int value for input n.
 * @param name category name
 * @param n No in category
 * @param m max int value to return
 * @returns random int value for input n
 */
export const getHashIn = <P extends number>(
  name: string,
  setCount: P,
  n: number,
  m: number,
): number[] => {
  const vals = getHash(name, setCount, n);
  return vals.map((v) => Math.floor(v * (m + 1)));
};
