import { CreateTransaction } from "@modules/Transactions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transactions/create/")({
  component: () => <CreateTransaction />,
});
