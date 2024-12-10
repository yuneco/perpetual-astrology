import { memo, type FC } from "react";
import { Flex, k } from "@kuma-ui/core";
import { StarRating } from "./StarRating";
import { ColorBar } from "./ColorBar";
import { ROW_HEIGHT } from "./defs/appConfig";
import { getDayContents } from "./logics/getDayContents";
import { toYMD } from "./logics/dateForNo";

type Props = {
  dayNo: number;
  seedNumber: number;
  onClick: (rowNo: number) => void;
};

const ListRowComp: FC<Props> = ({ dayNo, seedNumber, onClick }) => {
  const contents = getDayContents(dayNo, seedNumber);
  return (
    <Flex
      key={`row-${dayNo}`}
      h={ROW_HEIGHT}
      w="100%"
      overflowY={"hidden"}
      bg={dayNo % 2 === 0 ? "#fff" : "#f9f9f9"}
      borderRadius={4}
      alignItems={"center"}
      padding="0 8px"
      style={{
        pointerEvents: "auto",
      }}
      _hover={{
        bg: "colors.focus.bg",
        cursor: "pointer",
      }}
      onClick={() => onClick(dayNo)}
    >
      <Flex gap={4} fontFamily="fonts.mono" alignItems="center">
        <span>{toYMD(contents.date)}</span>
        <k.span color={contents.dayColor}>{contents.dayOfWeekStr}</k.span>
        <span>{contents.moon}</span>
        <StarRating rating={contents.rating} />
        <ColorBar
          color={contents.luckyColor}
          textColor={contents.luckyTextColor}
        />
        <k.span className="line3" paddingLeft={2}>
          {contents.luckyMenu}
        </k.span>
      </Flex>
    </Flex>
  );
};

export const ListRow = memo(ListRowComp);
