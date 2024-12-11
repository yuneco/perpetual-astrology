import { useMemo, useRef, useState, type FC } from "react";
import { getDayContents } from "./logics/getDayContents";
import { Box, Button, Grid, HStack, k, Text, VStack } from "@kuma-ui/core";
import { type Seed, seedToNumber } from "../defs/Seed";
import { ColorBar } from "./ColorBar";
import { StarRating } from "./StarRating";
import { copyToClipboard, tweet } from "./logics/exportContents";
import { getZodiacSign } from "../defs/zodiacSign";
import { toYMDJa } from "./logics/dateForNo";
import { ColoseButton } from "./CloseButton";

type Props = {
  dayNo: number;
  seed: Seed;
  onClose: () => void;
};

export const DayDetail: FC<Props> = ({ dayNo, seed, onClose }) => {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const seedNumber = useMemo(() => seedToNumber(seed), [seed]);
  const contents = useMemo(
    () => getDayContents(dayNo, seedNumber),
    [seedNumber, dayNo],
  );

  const handleCopy = () => {
    copyToClipboard(seed, contents);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
      onClick={handleClose}
      animation="fade 0.3s 1"
      className="bgBlur8"
    >
      <Box
        ref={innerRef}
        variant="modal"
        width="max(400px, 50%)"
        maxW="800px"
        animation="pop 0.2s 1"
        onClick={(ev: React.MouseEvent) => ev.stopPropagation()}
      >
        <ColoseButton onClick={handleClose} />
        <VStack gap={16}>
          <Box>
            <k.h2 textAlign="center">
              {seed.userName}さん{getZodiacSign(seed.sign).name}
            </k.h2>
            <k.h3 textAlign="center">
              {toYMDJa(contents.date)}（{contents.dayOfWeekStr}曜日）の運勢
            </k.h3>
          </Box>

          <Grid
            gridTemplateColumns="140px 1fr"
            gridTemplateRows="repeat(auto, min-content)"
            gap="4px 12px"
            alignItems="center"
          >
            <Text variant="label">運勢</Text>
            <StarRating rating={contents.rating} />
            <Text variant="label">ラッキーカラー</Text>
            <ColorBar
              color={contents.luckyColor}
              textColor={contents.luckyTextColor}
            />
            <Text variant="label">ラッキーサイゼ</Text>
            <p>{contents.luckyMenu}</p>
            <Text variant="label">ラッキーUUID</Text>
            <p>{contents.luckyUuid}</p>
          </Grid>

          <HStack alignItems="center" justifyContent="center" gap={8}>
            <Button type="button" onClick={handleCopy}>
              {isCopied ? "✔️ Copied!" : "Copy"}
            </Button>
            <Button type="button" onClick={() => tweet(seed, contents)}>
              Tweet
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
