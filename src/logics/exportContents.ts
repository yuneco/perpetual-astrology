import type { Seed } from "../defs/Seed";
import { getZodiacSign } from "../defs/zodiacSign";
import { toYMDJa } from "./dateForNo";
import type { DayContents } from "./getDayContents";

const getContentPlainText = (
  seed: Seed,
  contents: DayContents,
) => `${seed.userName}さん${getZodiacSign(seed.sign).name}
${toYMDJa(contents.date)}（${contents.dayOfWeekStr}）の運勢
🔮運勢:${"★".repeat(contents.rating)}
🔮ラッキーカラー:${contents.luckyColor}
🔮ラッキーサイゼ:${contents.luckyMenu}`;

export const copyToClipboard = (seed: Seed, contents: DayContents) => {
  const text = `${getContentPlainText(seed, contents)}
${document.location.href}
`;
  navigator.clipboard.writeText(text);
};

export const tweet = (seed: Seed, contents: DayContents) => {
  const text = getContentPlainText(seed, contents);
  const url = document.location.href;
  const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}`;
  window.open(tweetUrl, "_blank");
};
