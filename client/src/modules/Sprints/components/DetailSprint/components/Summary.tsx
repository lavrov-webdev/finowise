import { Card } from "@components/Card";
import { Definition } from "@components/Definition";
import { getSprintByIdQueryOptions } from "@modules/Sprints/api";
import { useFormatAmount } from "@system/hooks";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import styles from "../DetailSprint.module.scss";
import { useSprintSummary } from "../hooks/useSprintSummary";
import { Skeleton } from "@components/Skeleton";
import { Flex } from "@gravity-ui/uikit";
import { EditSprintModal } from "./EditSprintModal";

type Props = {
  sprintId: number;
};

export const Summary: FC<Props> = ({ sprintId }) => {
  const sprintState = useQuery(getSprintByIdQueryOptions(sprintId));
  const sprintSummary = useSprintSummary(sprintState.data || null);

  const currentBalance = useFormatAmount(sprintSummary.currentBalance);
  const initialAmount = useFormatAmount(sprintSummary.initialAmount);
  const initialPlannedExpense = useFormatAmount(
    sprintSummary.initialPlannedExpense,
  );
  const initialPlannedRemaining = useFormatAmount(
    sprintSummary.initialPlannedRemaining,
  );
  const totalExpenses = useFormatAmount(sprintSummary.totalExpenses);
  const remainingBudget = useFormatAmount(sprintSummary.remainingBudget);
  const actualPlannedRemaining = useFormatAmount(
    sprintSummary.actualPlannedRemaining,
  );

  if (sprintState.isLoading) {
    return null;
  }
  return (
    <Card
      title="Подытог"
      className={styles.summary}
      maxWidth="none"
      actions={<EditSprintModal sprintId={sprintId} />}
    >
      {sprintState.isLoading ? (
        <Flex direction="column" gap={2}>
          <Skeleton width={350} height={22} />
          <Skeleton width={350} height={22} />
          <Skeleton width={350} height={22} />
          <Skeleton width={350} height={22} />
          <Skeleton width={350} height={22} />
          <Skeleton width={350} height={22} />
        </Flex>
      ) : (
        <>
          <Definition
            title="Текущий баланс"
            value={currentBalance}
            withDivider
          />
          <Definition
            title="Стартовая сумма"
            value={initialAmount}
            withDivider
          />
          <Definition
            title="Стартовый план"
            value={initialPlannedExpense}
            withDivider
          />
          <Definition
            title="Плановый остаток на старте"
            value={initialPlannedRemaining}
            withDivider
          />
          <Definition title="Общие расходы" value={totalExpenses} withDivider />
          <Definition
            title="Осталось по плану"
            value={remainingBudget}
            withDivider
          />
          <Definition
            title="Фактический плановый остаток"
            value={actualPlannedRemaining}
          />
        </>
      )}
    </Card>
  );
};
