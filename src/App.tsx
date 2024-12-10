import { useState } from "react";
import "./App.css";
import { InfScroller } from "./InfScroller";
import { css } from "@kuma-ui/core";
import { List } from "./List";
import { ROW_HEIGHT } from "./appConfig";

const view = css`
  width: 100%;
  height: 100svh;
  position: relative;
`;

const DAYS_IN_4_CENTURIES = 4 * 365 * 100 + 97;
const MAX_DAY = ((10 * 10000 - 2000) / 400) * DAYS_IN_4_CENTURIES;
const MAX_Y = MAX_DAY * ROW_HEIGHT;

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);
const EPOC = new Date(2000, 0, 1);
const DAYS_FROM_EPOC =
  (TODAY.getTime() - EPOC.getTime()) / (24 * 60 * 60 * 1000);
const screenHeight = window.innerHeight;
const OFFSET = DAYS_FROM_EPOC * ROW_HEIGHT - screenHeight / 2;

export const App = () => {
  const [y, setY] = useState(0);

  return (
    <div className={view}>
      <InfScroller onChange={setY} max={MAX_Y} initial={OFFSET}>
        <List offsetPx={y} />
      </InfScroller>
    </div>
  );
};
