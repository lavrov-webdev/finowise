import { Button, Flex, Popup, Text } from "@gravity-ui/uikit";
import { useModal } from "@system/hooks";
import { FC, PropsWithChildren, useRef } from "react";

type Props = {
  onConfirm: (e: React.MouseEvent) => void;
  isLoading: boolean;
  confirmText?: string;
};

export const ConfirmButton: FC<PropsWithChildren<Props>> = ({
  onConfirm,
  confirmText,
  isLoading,
  children,
}) => {
  const { isOpen, closeModal: closePopup, openModal: openPopup } = useModal();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button view="outlined-danger" onClick={openPopup} ref={buttonRef}>
        {children}
      </Button>
      <Popup anchorRef={buttonRef} onClose={closePopup} open={isOpen}>
        <Flex direction="column" gap={1}>
          <Text variant="caption-2">{confirmText}</Text>
          <Button
            width="max"
            view="outlined-danger"
            loading={isLoading}
            onClick={onConfirm}
          >
            Подтвердить
          </Button>
        </Flex>
      </Popup>
    </>
  );
};
