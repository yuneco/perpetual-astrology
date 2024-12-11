import { k, Text } from "@kuma-ui/core";

export const Info = () => {
  return (
    <Text
      position="fixed"
      bottom={4}
      right={16}
      p="4px 16px"
      boxShadow="0 0 16px #0004"
      borderRadius="4px"
      bg="#fadde6ff"
    >
      <k.a color="colors.body" href="https://github.com/yuneco">
        🐈‍⬛ github.com/yuneco
      </k.a>
    </Text>
  );
};
