import { Box } from "@kuma-ui/core";
import { type FC, memo, useCallback, useState } from "react";
import { ListRow } from "./ListRow";
import { ROW_HEIGHT } from "../defs/appConfig";

type Props = {
  offsetPx: number;
  seedNumber: number;
  onClick: (dayNo: number) => void;
};

const watchSize = (
  el: HTMLElement,
  onResize: (size: DOMRectReadOnly) => void,
) => {
  const observer = new ResizeObserver((entries) => {
    onResize(entries[0].contentRect);
  });
  observer.observe(el);
  // initial call
  onResize(el.getBoundingClientRect());
  return () => observer.disconnect();
};

type ContentProps = {
  start: number;
  count: number;
  seedNumber: number;
  onClick: (dayNo: number) => void;
};
const ListContent: FC<ContentProps> = ({
  start,
  count,
  seedNumber,
  onClick,
}) => {
  const row = (dayNo: number) => (
    <ListRow
      key={dayNo}
      dayNo={dayNo}
      seedNumber={seedNumber}
      onClick={onClick}
    />
  );

  return <>{Array.from({ length: count }).map((_, i) => row(start + i))}</>;
};
const ListContentMemo = memo(ListContent);

export const List: FC<Props> = ({ offsetPx, seedNumber, onClick }) => {
  const [count, setCount] = useState(0);
  const start = Math.floor(offsetPx / ROW_HEIGHT);

  const outer = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    return watchSize(el, (size) => {
      setCount(Math.ceil(size.height / ROW_HEIGHT) + 1);
    });
  }, []);

  const translateY = -offsetPx % ROW_HEIGHT;

  return (
    <Box
      position="relative"
      w="100%"
      h="100svh"
      p={2}
      ref={outer}
      style={{ transform: `translateY(${translateY}px)` }}
    >
      <ListContentMemo
        start={start}
        count={count}
        seedNumber={seedNumber}
        onClick={onClick}
      />
    </Box>
  );
};
