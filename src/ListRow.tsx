import { memo, type FC } from "react";
import { dateForNo, toYMD } from "./logics/dateForNo";
import { Flex, k } from "@kuma-ui/core";
import { getMoon } from "./logics/getMoon";
import { StarRating } from "./StarRating";
import { getStarForDate } from "./logics/getStar";
import { ColorBar } from "./ColorBar";
import { getColorForDate } from "./logics/getColor";
import { getMenuForDate } from "./logics/getMenu";

type Props = {
  rowNo: number;
};

const DayOfWeek = ({ day }: { day: number }) => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return (
    <k.span
      color={
        day === 0 ? "colors.sun" : day === 6 ? "colors.sat" : "colors.body"
      }
    >
      {days[day]}
    </k.span>
  );
};

const ListRowComp: FC<Props> = ({ rowNo }) => {
  const date = dateForNo(rowNo);
  const [bg, fg] = getColorForDate(date);
  return (
    <Flex gap={4} fontFamily="fonts.mono" alignItems="center">
      <span>{toYMD(date)}</span>
      <DayOfWeek day={date.getDay()} />
      <span>{getMoon(date)}</span>
      <span>
        <StarRating rating={getStarForDate(date)} />
      </span>
      <ColorBar color={bg} textColor={fg} />
      <k.span className="line3" paddingLeft={2}>
        {getMenuForDate(date)}
      </k.span>
      {/* <span>{uuidForDate(date)}</span> */}
    </Flex>
  );
};

export const ListRow = memo(ListRowComp);
