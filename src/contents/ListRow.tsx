import { memo, type FC } from "react";
import { css, Flex, Text } from "@kuma-ui/core";
import { StarRating } from "./StarRating";
import { ColorBar } from "./ColorBar";
import { ROW_HEIGHT } from "../defs/appConfig";
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
      className="list-row"
      onClick={() => onClick(dayNo)}
    >
      <Flex gap={4} alignItems="center">
        <Text fontFamily="fonts.mono">{toYMD(contents.date)}</Text>
        <Text fontFamily="fonts.mono" color={contents.dayColor}>
          {contents.dayOfWeekStr}
        </Text>
        <Text>{contents.moon}</Text>
        <StarRating rating={contents.rating} />
        <ColorBar
          color={contents.luckyColor}
          textColor={contents.luckyTextColor}
        />
        <Text
          paddingLeft={2}
          className={css`
            line-height: 1.2;
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        `}
        >
          {contents.luckyMenu}
        </Text>
      </Flex>
    </Flex>
  );
};

export const ListRow = memo(ListRowComp);
