import { Card } from "@components/Card";
import { Skeleton } from "@components/Skeleton";
import { Pencil } from "@gravity-ui/icons";
import { Button, Icon, Modal } from "@gravity-ui/uikit";
import { getSprintByIdQueryOptions } from "@modules/Sprints/api";
import { useModal } from "@system/hooks";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { EditSprintForm } from "../../EditSprintForm";

type Props = {
  sprintId: number;
};

export const EditSprintModal: FC<Props> = ({ sprintId }) => {
  const modal = useModal();
  const sprintState = useQuery(getSprintByIdQueryOptions(sprintId));

  if (sprintState.isLoading) {
    return <Skeleton width={28} height={28} />;
  }

  return (
    <>
      <Button onClick={modal.openModal}>
        <Icon data={Pencil} />
      </Button>
      <Modal open={modal.isOpen} onClose={modal.closeModal}>
        <Card title="Редактировать спринт">
          <EditSprintForm sprint={sprintState.data!} modalProps={modal} />
        </Card>
      </Modal>
    </>
  );
};
