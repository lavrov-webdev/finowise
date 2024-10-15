import { FormSelector } from "@components/Form";
import { getEnvelopesByDateQueryOptions } from "@modules/Envelopes/api";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useEnvelopesOptions } from "./hooks/useEnvelopesOptions";

type Props = {
  date?: string;
};

export const EnvelopeSelector: FC<Props> = ({ date }) => {
  const envelopesState = useQuery(getEnvelopesByDateQueryOptions(date));
  const options = useEnvelopesOptions(envelopesState.data || []);

  return (
    <FormSelector
      name="envelopeId"
      options={options}
      placeholder="Выберите конверт"
      filterable
      isNumberValue
      loading={envelopesState.isLoading}
    />
  );
};
