import { client } from "@generated";

client.setConfig({
    baseURL:
        process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "",
    withCredentials: true,
    throwOnError: true
})