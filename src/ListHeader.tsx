import type { FC } from "react";
import type { Seed } from "./defs/Seed";
import { Flex, Text } from "@kuma-ui/core";

type Props = {
  seed: Seed;
  onRequestReset: () => void;
};

export const ListHeader: FC<Props> = ({ seed, onRequestReset }) => {
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      w="100%"
      bg="#fff8"
      zIndex="1"
      backdropFilter="blur(4px)"
    >
      <Text>
        {seed.userName}さん（{seed.sign}）の運勢
      </Text>
      <button type="button" onClick={onRequestReset}>
        Reset
      </button>
    </Flex>
  );
};