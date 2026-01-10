import type { Client } from "./types.ts";

export default (baseURL: string): Client => ({
  get: async (path: string) => {
    const response = await fetch(baseURL + path);
    const payload = response.headers.get("Content-Type") === "application/json"
      ? await response.json()
      : await response.text();
    return { response, payload };
  },
});
