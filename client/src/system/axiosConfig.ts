import { client } from "@generated";
import axiosRetry from "axios-retry";

client.setConfig({
  baseURL: "/api",
  withCredentials: true,
  throwOnError: true,
});

axiosRetry(client.instance, { retries: 0 });
