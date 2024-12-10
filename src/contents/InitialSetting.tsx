import { type FC, useState } from "react";
import type { Seed } from "../defs/Seed";
import { zodiacSigns } from "../defs/zodiacSign";
import { Box } from "@kuma-ui/core";

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
    <Box
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <input value={seed.userName} onChange={handleChangeName} />
      <select value={seed.sign} onChange={handleChangeSign}>
        {zodiacSigns.map((sign) => (
          <option key={sign.id} value={sign.id}>
            {sign.name}
            {sign.range}
          </option>
        ))}
      </select>
      <button type="button" onClick={() => onOk(seed)}>
        OK
      </button>
    </Box>
  );
};
