import { MenuItem } from "@gravity-ui/navigation";
import { Link } from "@tanstack/react-router";
import styles from "../Aside.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getCurrentSprintQueryOptions } from "@modules/Sprints";
import { useMemo } from "react";
import { Loader } from "@gravity-ui/uikit";

export const useMenuItems = (): MenuItem[] => {
  const currentSprintIdState = useQuery(getCurrentSprintQueryOptions());
  const currentSprintString = useMemo(
    () => currentSprintIdState.data?.id?.toString() || "current",
    [currentSprintIdState.data],
  );
  return useMemo(
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
      },
      // {
      //     id: "settings",
      //     title: "Настройки",
      //     type: "action",
      // }
    ],
    [currentSprintIdState],
  );
};
