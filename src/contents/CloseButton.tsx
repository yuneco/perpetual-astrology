import { Button } from "@kuma-ui/core";
import type { FC } from "react";

type Props = {
  onClick: () => void;
};

export const ColoseButton: FC<Props> = ({ onClick }) => {
  return (
    <Button
      position="absolute"
      top={-10}
      right={-10}
      zIndex={1}
      w={32}
      h={32}
      borderRadius={16}
      onClick={onClick}
      textAlign="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontSize={24}
    >
      ×
    </Button>
  );
};
