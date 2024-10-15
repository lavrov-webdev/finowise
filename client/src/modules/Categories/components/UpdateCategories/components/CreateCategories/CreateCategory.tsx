import { FormTextInput } from "@components/Form";
import { Button, Icon } from "@gravity-ui/uikit";
import { TrashBin } from "@gravity-ui/icons";
import { FC, useCallback } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import styles from "../../UpdateCategories.module.scss";

type Props = {
  id: number;
  onDelete: UseFieldArrayRemove;
};

export const CreateCategory: FC<Props> = ({ id, onDelete }) => {
  const handleDelete = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);
  return (
    <FormTextInput
      autoFocus
      hasClear
      className={styles.createCategoriesItem}
      name={`newCategories.${id}.name`}
      endContent={
        <Button onClick={handleDelete}>
          <Icon data={TrashBin} />
        </Button>
      }
    />
  );
};
