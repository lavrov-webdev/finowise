import { Flex } from "@gravity-ui/uikit";
import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";

export const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex gap={3} justifyContent="flex-end">
      {children}
    </Flex>
  );
};
