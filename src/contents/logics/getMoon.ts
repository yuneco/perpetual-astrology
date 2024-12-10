const c = [0, 2, 0, 2, 2, 4, 5, 6, 7, 8, 9, 10];

const chars = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"] as const;
type Moon = (typeof chars)[number];

export const getMoon = (date: Date): Moon => {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  const age = (((y - 11) % 19) * 11 + c[m] + d) % 30;
  return chars[((age / 30) * chars.length) | 0];
};
