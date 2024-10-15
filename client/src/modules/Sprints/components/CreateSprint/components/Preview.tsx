import { Card } from "@components/Card";
import { Definition } from "@components/Definition";
import { TCreateSprintDto, TCreateSprintDtoFields } from "@modules/Sprints";
import { useFormatAmount } from "@system/hooks";
import { useFormContext, useWatch } from "react-hook-form";
import styles from "../CreateSprint.module.scss";

export const Preview = () => {
  const form = useFormContext<TCreateSprintDtoFields, any, TCreateSprintDto>();
  useWatch({ control: form.control, name: "envelopes" });
  useWatch({ control: form.control, name: "startSum" });

  const planSpendings = form.getValues("envelopes").reduce((acc, envelope) => {
    return acc + envelope.amount;
  }, 0);
  const planRemaining = form.getValues("startSum") - planSpendings;

  const formattedStartSum = useFormatAmount(form.getValues("startSum"));
  const formattedPlainSpendings = useFormatAmount(planSpendings);
  const formattedPlainRemaining = useFormatAmount(planRemaining);
  return (
    <Card title="Подытог" className={styles.preview}>
      <div>
        <Definition
          title="Стартовая сумма"
          value={formattedStartSum}
          withDivider
        />
        <Definition
          title="Плановый расход"
          value={formattedPlainSpendings}
          withDivider
        />
        <Definition title="Плановый остаток" value={formattedPlainRemaining} />
      </div>
    </Card>
  );
};
