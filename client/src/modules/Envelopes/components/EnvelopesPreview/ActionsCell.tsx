import { Pencil } from "@gravity-ui/icons";
import { Button, Icon, Modal } from "@gravity-ui/uikit";
import { useModal } from "@system/hooks";
import { FC } from "react";
import { TEnvelopeSummary } from "./types";
import { EditEnvelopeForm } from "./EditEnvelopeForm";

type Props = {
  envelope: TEnvelopeSummary;
};

export const ActionsCell: FC<Props> = ({ envelope }) => {
  const modal = useModal();

  return (
    <div>
      <Button onClick={modal.openModal}>
        <Icon data={Pencil} />
      </Button>
      <Modal open={modal.isOpen} onClose={modal.closeModal}>
        <EditEnvelopeForm envelope={envelope} onClose={modal.closeModal} />
      </Modal>
    </div>
  );
};
