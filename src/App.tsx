import { useState } from "react";
import "./App.css";
import { InfScroller } from "./InfScroller";
import { Box } from "@kuma-ui/core";
import { List } from "./List";
import { MAX_LIST_Y_PX, TODAY_LIST_OFFSET_PX } from "./appConfig";
import { InitialSetting } from "./InitialSetting";
import { DEFAULT_SEED, seedToNumber, type Seed } from "./defs/Seed";
import { ListHeader } from "./ListHeader";

export const App = () => {
  const [y, setY] = useState(0);
  const [initialSeed, setInitialSeed] = useState<Seed>(DEFAULT_SEED);
  const [seed, setSeed] = useState<Seed>();

  const reset = () => {
    setInitialSeed(seed ?? DEFAULT_SEED);
    setSeed(undefined);
  };

  return (
    <Box w="100%" h="100svh" position="relative">
      {seed ? (
        <>
          <ListHeader seed={seed} onRequestReset={reset} />
          <InfScroller
            onChange={setY}
            max={MAX_LIST_Y_PX}
            initial={TODAY_LIST_OFFSET_PX}
          >
            <List seedNumber={seedToNumber(seed)} offsetPx={y} />
          </InfScroller>
        </>
      ) : (
        <InitialSetting onOk={setSeed} initialSeed={initialSeed} />
      )}
    </Box>
  );
};
