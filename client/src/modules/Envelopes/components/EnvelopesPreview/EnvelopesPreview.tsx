import { Loader, Table } from "@gravity-ui/uikit";
import { getSprintByIdQueryOptions } from "@modules/Sprints";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { envelopeColumns } from "./consts";
import { useEnvelopesSummary } from "./hooks/useEnvelopesSummary";
import { TEnvelopeSummary } from "./types";
import styles from "./EnvelopesPreview.module.scss";

type Props = {
  sprintId: number;
  onRowClick: (envelope: TEnvelopeSummary) => void;
  selectedEnvelopeId?: number | null;
};

export const EnvelopesPreview: FC<Props> = ({
  sprintId,
  onRowClick,
  selectedEnvelopeId,
}) => {
  const sprintState = useQuery(getSprintByIdQueryOptions(sprintId));
  const tableData = useEnvelopesSummary(sprintState.data?.envelopes || []);

  return sprintState.isLoading ? (
    <Loader size="l" className={styles.loader} />
  ) : (
    <Table
      onRowClick={onRowClick}
      data={tableData}
      columns={envelopeColumns}
      getRowDescriptor={(item) => ({
        id: item.id.toString(),
        disabled: false,
        classNames: selectedEnvelopeId === item.id ? [styles.selected] : [],
      })}
    />
  );
};
