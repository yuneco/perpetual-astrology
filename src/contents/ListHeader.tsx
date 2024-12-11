import type { FC } from "react";
import type { Seed } from "../defs/Seed";
import { Button, Flex, HStack, Text } from "@kuma-ui/core";
import { getZodiacSign } from "../defs/zodiacSign";

type Props = {
  seed: Seed;
  onRequestReset: () => void;
};

export const ListHeader: FC<Props> = ({ seed, onRequestReset }) => {
  return (
    <Flex position="fixed" top={0} left={0} w="100%" justifyContent="center">
      <HStack
        alignItems="center"
        gap={8}
        bg="white"
        p="0 12px 4px 12px"
        boxShadow="0 2px 16px #0004"
        borderRadius="0 0 12px 12px"
        animation="slideDown 0.3s 0.6s backwards"
      >
        <Text fontWeight="bold">
          {seed.userName}さん{getZodiacSign(seed.sign).name}の運勢
        </Text>
        <Button type="button" onClick={onRequestReset}>
          変更
        </Button>
      </HStack>
    </Flex>
  );
};
