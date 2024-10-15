import { FC } from "react";
import { Skeleton as GUISkeleton, SkeletonProps } from "@gravity-ui/uikit";

type Props = {
  width?: number;
  height?: number;
} & SkeletonProps;

export const Skeleton: FC<Props> = ({
  width,
  height,
  style,
  className,
  qa,
}) => {
  return (
    <GUISkeleton
      style={{ ...style, width, height }}
      className={className}
      qa={qa}
    />
  );
};
