export const BUFFER = 200000;
type WatchProps = {
  el: HTMLElement;
  onChange: (y: number) => void;
  min: number;
  max: number;
};

export const watchInfScrollTop = ({ el, onChange, min, max }: WatchProps) => {
  let isInvalidated = false;
  let isScrolling = false;
  let ignoreNext: number | undefined = undefined;
  let offset = 0;
  let start = 0;
  let timer = 0;

  const setTop = (y: number) => {
    if (el.scrollTop === y) return;
    ignoreNext = y;
    el.scrollTop = y;
  };

  const fire = (y: number) => {
    if (isInvalidated) return;
    onChange(Math.min(Math.max(y, min), max));
  };

  const decideInitialPos = () => {
    const base = BUFFER / 2;
    if (offset - min < base) return offset - min;
    if (max - offset < base) return BUFFER - (max - offset);
    return base;
  };

  const startScroll = () => {
    if (isScrolling) return;
    isScrolling = true;
    // reset center
    setTop(decideInitialPos());
    start = el.scrollTop;
    // accept scroll continue
  };

  const continuScroll = () => {
    if (!isScrolling) return;
    fire(offset + el.scrollTop - start);
    window.clearTimeout(timer);
    timer = window.setTimeout(endScroll, 100);
  };

  const endScroll = () => {
    if (!isScrolling) return;
    offset += el.scrollTop - start;
    setTop(decideInitialPos());
    isScrolling = false;
  };

  const change = (y: number) => {
    if (isScrolling) return;
    offset = y;
    fire(y);
    setTop(decideInitialPos());
  };

  const handler = () => {
    if (ignoreNext === el.scrollTop) {
      return;
    }
    ignoreNext = undefined;
    if (!isScrolling) {
      startScroll();
    } else {
      continuScroll();
    }
  };

  // handle scroll event
  el.addEventListener("scroll", handler);
  // initial pos
  setTop(decideInitialPos());

  // return cleanup function
  const cleanup = () => {
    isInvalidated = true;
    el.removeEventListener("scroll", handler);
  };
  return { cleanup, change };
};
