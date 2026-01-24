import { assertEquals, assertStringIncludes } from "@std/assert";
import { test } from "@std/testing/bdd";
import server from "../src/server.ts";
import request, { setBaseUrl } from "./utils/request.ts";

const baseURL = await server();
setBaseUrl(baseURL);

test("`/favicon.ico` returns favicon", async () => {
  const { response } = await request("/favicon.ico");
  assertEquals(
    response.headers.get("content-type"),
    "image/vnd.microsoft.icon",
  );
  assertEquals(response.status, 200);
});

test("`/banner.png` returns banner image", async () => {
  const { response } = await request("/banner.png");
  assertEquals(response.headers.get("content-type"), "image/png");
  assertEquals(response.status, 200);
});

test("`/screen.css` returns CSS", async () => {
  const { response } = await request("/screen.css");
  assertEquals(response.headers.get("content-type"), "text/css; charset=UTF-8");
  assertEquals(response.status, 200);
});

test("`/index.js` returns JS", async () => {
  const { response } = await request("/index.js");
  assertEquals(
    response.headers.get("content-type"),
    "text/javascript; charset=UTF-8",
  );
  assertEquals(response.status, 200);
});

test("`/` returns index", async () => {
  const { response, body } = await request("/");
  assertStringIncludes(body, '<h1 class="text-3xl">Hume Texts Online</h1>');
  assertEquals(response.status, 200);
});
