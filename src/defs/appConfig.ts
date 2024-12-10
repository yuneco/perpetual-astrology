export const ROW_HEIGHT = 52;

export const EPOC = new Date(2000, 0, 1);

const DAYS_IN_4_CENTURIES = 4 * 365 * 100 + 97;
export const MAX_DAY = ((10 * 10000 - 2000) / 400) * DAYS_IN_4_CENTURIES;

export const MAX_LIST_Y_PX = MAX_DAY * ROW_HEIGHT;
