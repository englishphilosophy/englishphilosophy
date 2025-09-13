import { assert, assertEquals } from "@std/assert";
import { test } from "@std/testing/bdd";
import client from "../src/client.ts";
import server from "../src/server.ts";
import { validateAuthor, validateIndex } from "./utils/validators.ts";

const baseURL = await server();
const { get } = client(baseURL);

test("`/` returns healthcheck", async () => {
  const { response, payload } = await get("/");
  assertEquals(payload.data, { status: "ok" });
  assertEquals(response.status, 200);
});

test("`/texts` returns index", async () => {
  const { response, payload } = await get("/texts");
  assert(
    validateIndex(payload.data),
    JSON.stringify(validateIndex.errors, null, 2),
  );
  assertEquals(response.status, 200);
});

test("`/texts/:author` returns author", async () => {
  const { payload } = await get("/texts");

  for (const child of payload.data.children) {
    const { payload } = await get(`/texts/${child.id}`);

    if ("error" in payload) {
      throw new Error(`Error fetching author ${child.id}: ${payload.error}`);
    }

    assertEquals(payload.data.id, child.id);
    assert(
      validateAuthor(payload.data),
      `Author ${child.id} is invalid: ${
        JSON.stringify(
          validateAuthor.errors,
          null,
          2,
        )
      }`,
    );
  }
});
