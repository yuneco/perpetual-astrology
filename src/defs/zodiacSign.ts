export const zodiacSigns = [
  {
    name: "♈️牡羊座",
    range: "（3月21日 - 4月19日）",
    id: "Aries",
  },
  {
    name: "♉️牡牛座",
    range: "（4月20日 - 5月20日）",
    id: "Taurus",
  },
  {
    name: "♊️双子座",
    range: "（5月21日 - 6月20日）",
    id: "Gemini",
  },
  {
    name: "♋️蟹座",
    range: "（6月21日 - 7月22日）",
    id: "Cancer",
  },
  {
    name: "♌️獅子座",
    range: "（7月23日 - 8月22日）",
    id: "Leo",
  },
  {
    name: "♍️乙女座",
    range: "（8月23日 - 9月22日）",
    id: "Virgo",
  },
  {
    name: "♎️天秤座",
    range: "（9月23日 - 10月22日）",
    id: "Libra",
  },
  {
    name: "♏️蠍座",
    range: "（10月23日 - 11月21日）",
    id: "Scorpio",
  },
  {
    name: "♐️射手座",
    range: "（11月22日 - 12月21日）",
    id: "Sagittarius",
  },
  {
    name: "♑️山羊座",
    range: "（12月22日 - 1月19日）",
    id: "Capricorn",
  },
  {
    name: "♒️水瓶座",
    range: "（1月20日 - 2月18日）",
    id: "Aquarius",
  },
  {
    name: "♓️魚座",
    range: "（2月19日 - 3月20日）",
    id: "Pisces",
  },
] as const;

export type ZodiacSignId = (typeof zodiacSigns)[number]["id"];

const dict = zodiacSigns.reduce(
  (acc, sign) => {
    acc[sign.id] = sign;
    return acc;
  },
  {} as Record<ZodiacSignId, (typeof zodiacSigns)[number]>,
);
export const getZodiacSign = (id: ZodiacSignId) => dict[id];

export const isZodiacSignId = (id: unknown): id is ZodiacSignId => {
  return typeof id === "string" && id in dict;
};
