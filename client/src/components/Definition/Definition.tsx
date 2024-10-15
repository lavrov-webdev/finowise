import { Divider, Text } from "@gravity-ui/uikit";
import { FC } from "react";
import styles from "./Definition.module.scss";

type Props = {
  title: string;
  value: string | number;
  withDivider?: boolean;
};

export const Definition: FC<Props> = ({ title, value, withDivider }) => {
  return (
    <div>
      <div className={styles.content}>
        <Text variant="subheader-2">{title}</Text>: <Text>{value}</Text>
      </div>
      {withDivider && (
        <div className={styles.divider}>
          <Divider />
        </div>
      )}
    </div>
  );
};
