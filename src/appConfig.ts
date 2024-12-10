export const ROW_HEIGHT = 52;

const DAYS_IN_4_CENTURIES = 4 * 365 * 100 + 97;
const MAX_DAY = ((10 * 10000 - 2000) / 400) * DAYS_IN_4_CENTURIES;
export const MAX_LIST_Y_PX = MAX_DAY * ROW_HEIGHT;

const today = new Date();
today.setHours(0, 0, 0, 0);
const EPOC = new Date(2000, 0, 1);
const DAYS_FROM_EPOC =
  (today.getTime() - EPOC.getTime()) / (24 * 60 * 60 * 1000);
const screenHeight = window.innerHeight;
export const TODAY_LIST_OFFSET_PX =
  DAYS_FROM_EPOC * ROW_HEIGHT - screenHeight / 2;
