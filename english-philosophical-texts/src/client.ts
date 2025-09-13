import type { Client } from "./types.ts";

export default (baseURL: string): Client => ({
  get: async (path: string) => {
    const response = await fetch(baseURL + path);
    const payload = await response.json();
    return { response, payload };
  },
});
