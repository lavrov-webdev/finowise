import { MenuItem } from "@gravity-ui/navigation";
import { Link } from "@tanstack/react-router";
import styles from "../Aside.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getCurrentSprintQueryOptions } from "@modules/Sprints";
import { useMemo } from "react";
import { Loader } from "@gravity-ui/uikit";
import { CirclePlay, CirclePlus, ListTimeline, Plus, Tag } from "@gravity-ui/icons";

export const useMenuItems = (): MenuItem[] => {
  const currentSprintIdState = useQuery(getCurrentSprintQueryOptions());
  const currentSprintString = useMemo(
    () => currentSprintIdState.data?.data?.id?.toString() || "current",
    [currentSprintIdState.data],
  );
  return useMemo<MenuItem[]>(
    () => [
      {
        itemWrapper(p, makeItem) {
          return currentSprintIdState.isLoading ? (
            <Loader className={styles.link} size="s" />
          ) : (
            <Link
              className={styles.link}
              to="/sprints/$sprintId"
              params={{ sprintId: currentSprintString || "0" }}
            >
              {makeItem(p)}
            </Link>
          );
        },
        id: "currentSprint",
        title: "Текущий спринт",
        icon: CirclePlay
      },
      {
        itemWrapper(p, makeItem) {
          return (
            <Link className={styles.link} to="/sprints">
              {makeItem(p)}
            </Link>
          );
        },
        id: "spirnts",
        title: "Спринты",
        icon: ListTimeline
      },
      {
        itemWrapper(p, makeItem) {
          return (
            <Link className={styles.link} to="/transactions/create">
              {makeItem(p)}
            </Link>
          );
        },
        id: "createTransaction",
        title: "Добавить транзакцию",
        icon: Plus
      },
      {
        itemWrapper(p, makeItem) {
          return (
            <Link className={styles.link} to="/sprints/create">
              {makeItem(p)}
            </Link>
          );
        },
        id: "createSprint",
        title: "Начать новый спринт",
        icon: CirclePlus
      },
      {
        id: "categories",
        title: "Категории",
        itemWrapper(p, makeItem) {
          return (
            <Link className={styles.link} to="/categories">
              {makeItem(p)}
            </Link>
          );
        },
        icon: Tag
      },
    ],
    [currentSprintIdState],
  );
};
