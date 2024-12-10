import { Box } from "@kuma-ui/core";
import {
  useCallback,
  useRef,
  useState,
  type FC,
  type PropsWithChildren,
} from "react";
import { watchInfScrollTop, BUFFER } from "./watchInfScrollTop";
import { DummyScrollBar } from "./DummyScroller";

type Props = {
  onChange: (y: number) => void;
  min?: number;
  max?: number;
  initial?: number;
};

export const InfScroller: FC<PropsWithChildren<Props>> = ({
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  initial = 0,
  children,
}) => {
  const [y, setY] = useState(0);
  const changeValueRef = useRef<((y: number) => void) | null>(null);
  const ratio = (y - min) / (max - min);

  const handleChange = useCallback(
    (y: number) => {
      setY(y);
      onChange(y);
    },
    [onChange],
  );

  const handleChangeScroller = useCallback(
    (r: number) => {
      const y = Math.round(min + r * (max - min));
      changeValueRef.current?.(y);
    },
    [min, max],
  );

  // DOM ref for outer container
  // create watcher for scroll
  const outer = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;
      // return unwatch function
      const { cleanup, change } = watchInfScrollTop({
        el,
        onChange: handleChange,
        min,
        max,
      });
      changeValueRef.current = change;
      if (initial > 0) change(initial);
      return cleanup;
    },
    [handleChange, min, max, initial],
  );

  return (
    <Box
      w="100%"
      h="100%"
      overflowY="auto"
      overflowX="hidden"
      display="flex"
      ref={outer}
      className="no-scrollbar"
    >
      <Box h={BUFFER} w={0} position="relative" />
      <Box top={0} left={0} w="100%" position="sticky">
        {children}
      </Box>
      <DummyScrollBar r={ratio} onChange={handleChangeScroller} />
    </Box>
  );
};
