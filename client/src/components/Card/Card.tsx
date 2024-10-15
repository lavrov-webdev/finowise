import { CardProps, Flex, Card as GUCard, Text } from "@gravity-ui/uikit";
import { FC, ReactNode } from "react";
import styles from "./Card.module.scss";
import cn from "classnames";

type Props = CardProps & {
  title?: string;
  actions?: ReactNode;
};

export const Card: FC<Props> = ({
  className,
  children,
  title,
  width,
  maxWidth,
  actions,
  ...rest
}) => {
  return (
    <GUCard
      className={cn(className, styles.content)}
      width={width || "100%"}
      maxWidth={maxWidth || 600}
      {...rest}
    >
      <Flex justifyContent="space-between" alignItems="center">
        {Boolean(title) && (
          <Text variant="header-1" className={styles.title}>
            {title}
          </Text>
        )}
        {actions}
      </Flex>
      {children}
    </GUCard>
  );
};
