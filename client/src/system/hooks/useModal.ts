import { useCallback, useState } from "react";

interface UseModalConfig {
  initIsOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const useModal = (config?: UseModalConfig) => {
  const getInitState = () => {
    if (!config) {
      return false;
    }
    return "initIsOpen" in config ? config.initIsOpen! : false;
  };
  const [isOpen, setIsOpen] = useState(getInitState());

  const openModal = useCallback(() => {
    config?.onOpen?.();
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    config?.onClose?.();
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  }, [isOpen, closeModal, openModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  } as const;
};
