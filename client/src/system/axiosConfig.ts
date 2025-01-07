import { client } from "@generated";
import axiosRetry from 'axios-retry'

client.setConfig({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "",
    withCredentials: true,
    throwOnError: true,
})


axiosRetry(client.instance, { retries: 0 })