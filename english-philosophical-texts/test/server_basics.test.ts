import { assertEquals } from "@std/assert";
import { test } from "@std/testing/bdd";
import client from "../src/client.ts";
import server from "../src/server.ts";

const baseURL = await server();
const { get } = client(baseURL);

test("`/` returns index", async () => {
  const { response, payload } = await get("/");
  assertEquals(payload.data.id, "index");
  assertEquals(response.status, 200);
});

test("`/:author` returns author", async () => {
  const { payload } = await get("/");

  for (const child of payload.data.children) {
    const { response, payload } = await get(`/${child.id}`);
    if ("error" in payload) {
      throw new Error(`Error fetching author ${child.id}: ${payload.error}`);
    }

    assertEquals(payload.data.id, child.id);
    assertEquals(response.status, 200);
  }
});

test("`/:author/:text` returns text", async () => {
  const { payload } = await get("/");

  for (const child of payload.data.children) {
    const { payload } = await get(`/${child.id}`);
    if ("error" in payload) {
      throw new Error(`Error fetching author ${child.id}: ${payload.error}`);
    }

    for (const text of payload.data.children) {
      const path = text.id.replace(".", "/") as `${string}/${string}`;
      const { response, payload } = await get(`/${path}`);
      if ("error" in payload) {
        throw new Error(`Error fetching text ${text.id}: ${payload.error}`);
      }

      // note we only test the response for the top-level text, not it's children
      // otherwise this test would take ages
      assertEquals(payload.data.id, text.id);
      assertEquals(response.status, 200);
    }
  }
});
