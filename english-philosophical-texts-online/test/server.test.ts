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

test("`/leviathan.webp` returns leviathan image", async () => {
  const { response } = await request("/leviathan.webp");
  assertEquals(response.headers.get("content-type"), "image/webp");
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
  assertStringIncludes(body, "<h1>English Philosophical Texts Online</h1>");
  assertEquals(response.status, 200);
});

test("`/about` returns about page", async () => {
  const { response, body } = await request("/about");
  assertStringIncludes(body, "<h1>About: General Information</h1>");
  assertEquals(response.status, 200);
});

test("`/about/` returns about page", async () => {
  const { response, body } = await request("/about/");
  assertStringIncludes(body, "<h1>About: General Information</h1>");
  assertEquals(response.status, 200);
});

test("`/about/general` returns about page", async () => {
  const { response, body } = await request("/about/general");
  assertStringIncludes(body, "<h1>About: General Information</h1>");
  assertEquals(response.status, 200);
});

test("`/about/corpus` returns about page", async () => {
  const { response, body } = await request("/about/corpus");
  assertStringIncludes(body, "<h1>About: Corpus Details</h1>");
  assertEquals(response.status, 200);
});

test("`/about/principles` returns about page", async () => {
  const { response, body } = await request("/about/principles");
  assertStringIncludes(body, "<h1>About: Editorial Principles</h1>");
  assertEquals(response.status, 200);
});

test("`/about/permissions` returns about page", async () => {
  const { response, body } = await request("/about/permissions");
  assertStringIncludes(body, "<h1>About: Permissions</h1>");
  assertEquals(response.status, 200);
});

test.skip("`/:id` returns author", async () => {});

test.skip("`/:id+` returns text", async () => {});
