import { getHashIn } from "./getHash";

export const generateUUIDv4 = (dayNo: number, seedNumber: number): string => {
  // 128ビット (16バイト) の乱数を生成
  const bytes = getHashIn(
    {
      name: "uuid",
      setLength: 16,
      seedNumber,
    },
    dayNo,
    0xff,
  );

  // UUID v4 の仕様に従って 6オクテット目と 8オクテット目を修正
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // 上位4ビットを 0100 に設定
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // 上位2ビットを 10 に設定

  // バイト列を 16進数文字列に変換し、フォーマット
  const hex = bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};
