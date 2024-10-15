import { Skeleton } from "@components/Skeleton";
import styles from "../DetailSprint.module.scss";
import cn from "classnames";

export const Loader = () => {
  return (
    <div className={cn(styles.container, styles.containerLoader)}>
      <Skeleton className={styles.envelopes} />
      <Skeleton className={styles.summary} />
      <Skeleton className={styles.transactions} />
    </div>
  );
};
