import { k } from "@kuma-ui/core";
import type { FC } from "react";

type Props = {
  color: string;
  textColor: string;
};

export const ColorBar: FC<Props> = ({ color, textColor }) => {
  return (
    <k.span bg={color} color={textColor} p={4} borderRadius={4}>
      {color}
    </k.span>
  );
};
