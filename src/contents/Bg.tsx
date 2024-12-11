import { Flex } from "@kuma-ui/core";
import type { FC, PropsWithChildren } from "react";

export const Bg: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      w="100%"
      h="100%"
      position="absolute"
      top={0}
      left={0}
      overflow="hidden"
      placeItems={["center", "center"]}
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 800"
        opacity="0.4"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="bbblurry-filter"
            x="-100%"
            y="-100%"
            width="400%"
            height="400%"
            filterUnits="objectBoundingBox"
            primitiveUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur
              stdDeviation="95"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              in="SourceGraphic"
              edgeMode="none"
              result="blur"
            />
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse
            rx="233.5"
            ry="208.5"
            cx="502.94937789979383"
            cy="607.5014800579246"
            fill="hsla(277, 33%, 51%, 1.00)"
          />
          <ellipse
            rx="233.5"
            ry="208.5"
            cx="121.03980970007228"
            cy="578.306269127553"
            fill="hsla(337, 72%, 59%, 1.00)"
          />
          <ellipse
            rx="233.5"
            ry="208.5"
            cx="290.5783669779619"
            cy="234.28313920629307"
            fill="hsla(318, 54%, 58%, 1.00)"
          />
          <ellipse
            rx="233.5"
            ry="208.5"
            cx="725.8906600832001"
            cy="303.16370854415294"
            fill="hsla(213, 67%, 67%, 1.00)"
          />
        </g>
      </svg>
      {children}
    </Flex>
  );
};
