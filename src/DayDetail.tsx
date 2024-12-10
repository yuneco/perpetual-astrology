import { useMemo, useRef, type FC } from "react";
import { getDayContents } from "./logics/getDayContents";
import { Box, css, Grid, Text } from "@kuma-ui/core";
import { type Seed, seedToNumber } from "./defs/Seed";
import { ColorBar } from "./ColorBar";
import { StarRating } from "./StarRating";
import { copyToClipboard, tweet } from "./logics/exportContents";
import { getZodiacSign } from "./defs/zodiacSign";
import { toYMDJa } from "./logics/dateForNo";

type Props = {
  dayNo: number;
  seed: Seed;
  onClose: () => void;
};

export const DayDetail: FC<Props> = ({ dayNo, seed, onClose }) => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  const seedNumber = useMemo(() => seedToNumber(seed), [seed]);
  const contents = useMemo(
    () => getDayContents(dayNo, seedNumber),
    [seedNumber, dayNo],
  );

  const handleClose = async () => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (outer && inner) {
      await Promise.all([
        // outer: fadeout in 0.3s
        outer.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 300,
          fill: "forwards",
        }).finished,
        // inner: scale out in 0.3s
        inner.animate(
          [
            { scale: "1" },
            { scale: "1.1", opacity: 1, offset: 0.2 },
            { scale: "1.1", opacity: 1, offset: 0.3 },
            { scale: ".7", opacity: 0, easing: "cubic-bezier(.09,.73,.33,1)" },
          ],
          {
            duration: 300,
            fill: "forwards",
          },
        ).finished,
      ]);
    }
    onClose();
  };

  return (
    <Box
      ref={outerRef}
      position={"fixed"}
      top={0}
      left={0}
      width={"100vw"}
      height={"100vh"}
      bg={"#fff8"}
      backdropFilter={"blur(8px)"}
      onClick={handleClose}
      animation="fade 0.3s 1"
    >
      <Box
        ref={innerRef}
        position={"fixed"}
        margin={"auto"}
        bg={"#fffc"}
        top={"50%"}
        left={"50%"}
        width="max(400px, 50%)"
        padding={16}
        borderRadius={8}
        boxShadow={"0 0 16px #0004"}
        backdropFilter={"blur(4px)"}
        className={css`
          translate: -50% -50%
        `}
        animation="pop 0.2s 1"
        onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
      >
        <h2>
          {seed.userName}さん{getZodiacSign(seed.sign).name}
        </h2>
        <h3>
          {toYMDJa(contents.date)}（{contents.dayOfWeekStr}曜日）の運勢
        </h3>

        <Grid
          gridTemplateColumns="140px 1fr"
          gridTemplateRows="repeat(auto, min-content)"
          gap={4}
        >
          <Text>運勢</Text>
          <StarRating rating={contents.rating} />
          <Text>ラッキーカラー</Text>
          <ColorBar
            color={contents.luckyColor}
            textColor={contents.luckyTextColor}
          />
          <Text>ラッキーサイゼ</Text>
          <p>{contents.luckyMenu}</p>
          <Text>ラッキーUUID</Text>
          <p>{contents.luckyUuid}</p>
        </Grid>
        <button type="button" onClick={handleClose}>
          Close
        </button>
        <button type="button" onClick={() => copyToClipboard(seed, contents)}>
          Copy
        </button>
        <button type="button" onClick={() => tweet(seed, contents)}>
          Tweet
        </button>
      </Box>
    </Box>
  );
};
