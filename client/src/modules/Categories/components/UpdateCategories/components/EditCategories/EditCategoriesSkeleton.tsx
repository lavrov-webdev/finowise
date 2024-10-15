import { Skeleton } from "@gravity-ui/uikit";
import styles from "../../UpdateCategories.module.scss";

export const EditCategoriesSkeleton = () => {
  return (
    <>
      <Skeleton className={styles.editCategoriesSkeleton} />
      <Skeleton className={styles.editCategoriesSkeleton} />
      <Skeleton className={styles.editCategoriesSkeleton} />
      <Skeleton className={styles.editCategoriesSkeleton} />
      <Skeleton className={styles.editCategoriesSkeleton} />
    </>
  );
};
