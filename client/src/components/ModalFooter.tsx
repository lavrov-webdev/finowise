import { Flex } from "@gravity-ui/uikit";
import { FC, ReactNode } from "react";

export const ModalFooter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex gap={3} justifyContent="flex-end">
      {children}
    </Flex>
  );
};
