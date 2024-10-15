import { Skeleton } from "@components/Skeleton";
import styles from "./SprintsList.module.scss";

export const ListSkeleton = () => {
  return (
    <>
      <div className={styles.yearBlock}>
        <Skeleton width={200} height={32} className={styles.yearTitle} />
        <div className={styles.sprintsGrid}>
          <Skeleton height={52} />
          <Skeleton height={52} />
          <Skeleton height={52} />
          <Skeleton height={52} />
          <Skeleton height={52} />
          <Skeleton height={52} />
          <Skeleton height={52} />
        </div>
      </div>
      <div className={styles.yearBlock}>
        <Skeleton width={200} height={32} className={styles.yearTitle} />
        <div className={styles.sprintsGrid}>
          <Skeleton height={52} />
          <Skeleton height={52} />
          <Skeleton height={52} />
          <Skeleton height={52} />
        </div>
      </div>
    </>
  );
};
