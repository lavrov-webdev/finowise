import { Skeleton } from "@components/Skeleton";
import styles from "./CreateTransaction.module.scss";
import cn from "classnames";

export const Loader = () => {
  return (
    <div className={cn(styles.container, styles.containerLoader)}>
      <Skeleton width={600} className={styles.create} />
      <Skeleton width={600} className={styles.transactions} />
    </div>
  );
};
