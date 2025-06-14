import { Card } from "@components/Card";
import { ConfirmButton } from "@components/ConfirmButton";
import { Alert, Flex, Text } from "@gravity-ui/uikit";
import { EnvelopesPreview, TEnvelopeSummary } from "@modules/Envelopes";
import { getSprintByIdQueryOptions, useDeleteSprintMutation } from "@modules/Sprints/api";
import { TransactionsTable } from "@modules/Transactions";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { FC } from "react";
import styles from "./DetailSprint.module.scss";
import { EditSprintModal } from "./components/EditSprintModal";
import { Summary } from "./components/Summary";
import { useSelectedEnvelopeTransactions } from "./hooks/useSelectedEnvelopeTransactions";
import { selectedEnvelopeAtom } from "./store/selectedEnvelopeTransactions";

type Props = {
  sprintId: number;
};

export const DetailSprint: FC<Props> = ({ sprintId }) => {
  const navigate = useNavigate();
  const sprintState = useQuery(getSprintByIdQueryOptions(sprintId));
  const [selectedEnvelopeId, selectEnvelope] = useAtom(selectedEnvelopeAtom);
  const deleteSprint = useDeleteSprintMutation();
  const onSelectEnvelope = (envelope: TEnvelopeSummary) => {
    selectEnvelope(envelope.id);
  };
  const selectedEnvelopeTransactions = useSelectedEnvelopeTransactions(
    sprintState.data?.data?.envelopes || [],
    selectedEnvelopeId,
  );

  if ((sprintState.error as AxiosError)?.code === "404") {
    return (
      <Alert
        title="Такого спринта нет"
        message="Найдите нужый Вам спринт на странице спринтов"
        actions={
          <Alert.Action onClick={() => navigate({ to: "/sprints" })}>
            К списку спринтов
          </Alert.Action>
        }
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Flex gap={2}>
          <EditSprintModal sprintId={sprintId} />
          <ConfirmButton
            onConfirm={() => deleteSprint.mutate(sprintId)}
            isLoading={deleteSprint.isPending}
            confirmText="Удалить спринт?"
          >
            Удалить спринт
          </ConfirmButton>
        </Flex>
      </div>
      <Summary sprintId={sprintId} />
      <Card title="Конверты" maxWidth="none" className={styles.envelopes}>
        <EnvelopesPreview
          selectedEnvelopeId={selectedEnvelopeId}
          sprintId={sprintId}
          onRowClick={onSelectEnvelope}
        />
      </Card>
      <Card title="Расходы" className={styles.transactions} maxWidth="none">
        {selectedEnvelopeId === null ? (
          <div className={styles.withNoEnvelope}>
            <Text variant="subheader-3">Выберите категорию в таблице</Text>
          </div>
        ) : (
          <TransactionsTable transactions={selectedEnvelopeTransactions} />
        )}
      </Card>
    </div>
  );
};
