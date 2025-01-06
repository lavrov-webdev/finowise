import { DropdownMenu } from "@gravity-ui/uikit";
import { useModal } from "@system/hooks";
import { FC } from "react";
import { EditTransactionModal } from "../EditTransactionModal";
import { useDeleteTransaction } from "@modules/Transactions/api/hooks/useDeleteTransaction";
import { TransactionResponseDto } from "@generated";

type Props = {
  transaction: TransactionResponseDto;
};

export const ActionsCell: FC<Props> = ({ transaction }) => {
  const editModal = useModal();
  const deleteMutation = useDeleteTransaction();
  return (
    <div>
      <DropdownMenu
        items={[
          [
            {
              action: editModal.openModal,
              text: "Редактировать",
            },
          ],
          [
            {
              text: "Удалить",
              theme: "danger",
              action: () => deleteMutation.mutate(transaction.id),
              disabled: deleteMutation.isPending,
            },
          ],
        ]}
      ></DropdownMenu>
      <EditTransactionModal
        transaction={transaction}
        isOpen={editModal.isOpen}
        onClose={editModal.closeModal}
      />
    </div>
  );
};
