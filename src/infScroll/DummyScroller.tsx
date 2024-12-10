import { Box } from "@kuma-ui/core";
import { type FC, useEffect, useRef } from "react";

type Props = {
  r: number;
  onChange: (r: number) => void;
};

export const DummyScrollBar: FC<Props> = ({ r, onChange }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const ignore = useRef(false);

  const handleScroll = () => {
    if (ignore.current) {
      ignore.current = false;
      return;
    }
    const el = elRef.current;
    if (!el) return;
    const r = el.scrollTop / el.scrollHeight / 0.9;
    onChange(r);
  };

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const top = Math.round(r * el.scrollHeight * 0.9);
    if (el.scrollTop === top) return;
    ignore.current = true;
    elRef.current?.scrollTo({ top, behavior: "instant" });
  }, [r]);

  return (
    <Box
      ref={elRef}
      position="absolute"
      top={0}
      right="0px"
      zIndex={1}
      w="16px"
      h="100%"
      overflow="scroll"
      onScroll={handleScroll}
    >
      <Box position="relative" top={0} left={0} w={0} h="1000%" />
    </Box>
  );
};
