import { type FC, useState } from "react";
import type { Seed } from "../defs/Seed";
import { zodiacSigns } from "../defs/zodiacSign";
import { Box, Button, HStack, Input, k, Select, VStack } from "@kuma-ui/core";
import { Bg } from "./Bg";

type Props = {
  initialSeed: Seed;
  onOk: (seed: Seed) => void;
};

export const InitialSetting: FC<Props> = ({ initialSeed, onOk }) => {
  const [seed, setSeed] = useState<Seed>(initialSeed);

  const handleChangeSign = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSeed({
      ...seed,
      sign: e.target.value as Seed["sign"],
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed({
      ...seed,
      userName: e.target.value,
    });
  };

  return (
    <Bg>
      <Box variant="modal">
        <VStack gap={24}>
          <k.h2 textAlign="center">はじめになまえと星座をおしえてね</k.h2>
          <VStack gap={12}>
            <HStack alignItems="center" gap={4}>
              <Input
                variant="large"
                value={seed.userName}
                onChange={handleChangeName}
              />
              さん
            </HStack>
            <Select
              variant="large"
              value={seed.sign}
              onChange={handleChangeSign}
            >
              {zodiacSigns.map((sign) => (
                <option key={sign.id} value={sign.id}>
                  {sign.name}
                  {sign.range}
                </option>
              ))}
            </Select>
          </VStack>
          <Button variant="large" type="button" onClick={() => onOk(seed)}>
            10万年の運勢をみる
          </Button>
        </VStack>
      </Box>
    </Bg>
  );
};
