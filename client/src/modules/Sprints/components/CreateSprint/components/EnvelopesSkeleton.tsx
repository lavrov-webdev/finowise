import { Flex, Skeleton } from "@gravity-ui/uikit";
import styles from "../CreateSprint.module.scss";

export const EnvelopesSkeleton = () => {
  return (
    <Flex direction="column" gap={5}>
      <Skeleton className={styles.envelopesSkeleton} />
      <Skeleton className={styles.envelopesSkeleton} />
      <Skeleton className={styles.envelopesSkeleton} />
      <Skeleton className={styles.envelopesSkeleton} />
      <Skeleton className={styles.envelopesSkeleton} />
      <Skeleton className={styles.envelopesSkeleton} />
      <div />
    </Flex>
  );
};
