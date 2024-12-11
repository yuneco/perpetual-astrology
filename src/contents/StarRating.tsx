import { k } from "@kuma-ui/core";
import type { FC } from "react";

const EmptyStar = () => {
  return (
    <k.span
      style={{
        opacity: 0.5,
        filter: "grayscale(1)",
      }}
    >
      ⭐️
    </k.span>
  );
};

type Props = {
  rating: number;
  maxRating?: number;
};

export const StarRating: FC<Props> = ({ rating, maxRating = 5 }) => {
  return (
    <k.span aria-label={`${rating}/${maxRating}`}>
      {Array.from({ length: maxRating }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <span key={i}>{i < rating ? "⭐️" : <EmptyStar />}</span>
      ))}
    </k.span>
  );
};
