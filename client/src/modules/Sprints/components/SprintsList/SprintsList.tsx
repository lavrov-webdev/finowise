import { Card } from "@components/Card";
import { Text } from "@gravity-ui/uikit";
import { getSprintsQueryOptions } from "@modules/Sprints";
import { useErrorNotifier } from "@system/hooks";
import { Card as GUICard } from "@gravity-ui/uikit";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useMemo } from "react";
import styles from "./SprintsList.module.scss";
import { fomratSprintsDates } from "./utils/fomratSprintsDates";
import { groupSprintsByStartYear } from "./utils/groupSprintsByStartYear";
import { ListSkeleton } from "./ListSkeleton";
import { Link } from "@tanstack/react-router";
import { EmptyList } from "./EmptyList";

export const SprintsList = () => {
  const sprintsState = useQuery(getSprintsQueryOptions());
  const sprintsByYears = useMemo(
    () => groupSprintsByStartYear(sprintsState.data || []),
    [sprintsState.data],
  );
  useErrorNotifier(
    sprintsState.error as AxiosError,
    "Ошибка загрузки спринтов",
  );
  let content: React.ReactElement | React.ReactElement[];
  if (sprintsState.isLoading) {
    content = <ListSkeleton />;
  } else if (sprintsState.data?.length === 0) {
    content = <EmptyList />;
  } else {
    content = Object.entries(sprintsByYears).map(([year, sprints]) => {
      return (
        <div className={styles.yearBlock} key={year}>
          <Text className={styles.yearTitle} variant="subheader-2">
            {year}
          </Text>
          <div className={styles.sprintsGrid}>
            {sprints.map((sprint) => (
              <Link
                key={sprint.id}
                className={styles.sprintsItem}
                to="/sprints/$sprintId"
                params={{ sprintId: sprint.id.toString() }}
              >
                <GUICard className={styles.sprintsItemCard}>
                  {fomratSprintsDates(sprint.startDate)}-
                  {fomratSprintsDates(sprint.endDate)}
                </GUICard>
              </Link>
            ))}
          </div>
        </div>
      );
    });
  }
  return (
    <Card maxWidth={1200} title="Список спринтов">
      {content}
    </Card>
  );
};
