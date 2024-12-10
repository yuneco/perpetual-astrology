const pad2 = (num: number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

// 2000/01/01
const epoch = new Date(2000, 0, 1).getTime();

/**
 * Get date for day no
 * @param day day count. 0 = epoch
 */
export const dateForNo = (day: number): Date => {
  const date = new Date(epoch);
  date.setDate(date.getDate() + day);
  return date;
};

/**
 * format date to YYYY/MM/DD
 * @param date
 * @returns date string. YYYY/MM/DD
 */
export const toYMD = (date: Date): string => {
  return `${date.getFullYear()}/${pad2(date.getMonth() + 1)}/${pad2(date.getDate())}`;
};

/**
 * format date to YYYY年M月D日
 * @param date
 * @returns date string. YYYY年M月D日
 */
export const toYMDJa = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
