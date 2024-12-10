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
