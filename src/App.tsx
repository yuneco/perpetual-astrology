import { useState } from "react";
import "./App.css";
import { InfScroller } from "./infScroll/InfScroller";
import { Box } from "@kuma-ui/core";
import { List } from "./contents/List";
import { MAX_LIST_Y_PX } from "./defs/appConfig";
import { InitialSetting } from "./contents/InitialSetting";
import { DEFAULT_SEED, seedToNumber, type Seed } from "./defs/Seed";
import { ListHeader } from "./contents/ListHeader";
import { DayDetail } from "./contents/DayDetail";
import {
  getOffsetPxForDayNo,
  getOffsetPxForToday,
} from "./contents/logics/getOffset";
import {
  initialLoc,
  useAutoSetLocation,
} from "./contents/logics/useAutoSetLocation";

export const App = () => {
  const [y, setY] = useState(0);
  const [initialSeed, setInitialSeed] = useState<Seed>(
    initialLoc.seed ?? DEFAULT_SEED,
  );
  const [seed, setSeed] = useState<Seed | undefined>(
    initialLoc.seed ?? undefined,
  );
  const [selectedDayNo, setSelectedDayNo] = useState<number | undefined>(
    initialLoc.dayNo ?? undefined,
  );

  useAutoSetLocation({ seed, dayNo: selectedDayNo });

  const reset = () => {
    setInitialSeed(seed ?? DEFAULT_SEED);
    setSeed(undefined);
  };

  const selectDay = (dayNo: number) => {
    if (!seed) return;
    setSelectedDayNo(dayNo);
  };

  return (
    <Box w="100%" h="100svh" position="relative">
      {seed ? (
        <>
          <InfScroller
            onChange={setY}
            max={MAX_LIST_Y_PX}
            initial={
              initialLoc.dayNo
                ? getOffsetPxForDayNo(initialLoc.dayNo)
                : getOffsetPxForToday()
            }
          >
            <List
              seedNumber={seedToNumber(seed)}
              offsetPx={y}
              onClick={selectDay}
            />
          </InfScroller>
          <ListHeader seed={seed} onRequestReset={reset} />
          {selectedDayNo !== undefined && (
            <DayDetail
              dayNo={selectedDayNo}
              seed={seed}
              onClose={() => setSelectedDayNo(undefined)}
            />
          )}
        </>
      ) : (
        <InitialSetting onOk={setSeed} initialSeed={initialSeed} />
      )}
    </Box>
  );
};
