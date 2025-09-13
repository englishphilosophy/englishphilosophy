import { assertEquals } from "@std/assert";
import { test } from "@std/testing/bdd";
import client from "../src/client.ts";
import server from "../src/server.ts";

const baseURL = await server();
const { get } = client(baseURL);

test("`/search/:author/:text` requires query or regex", async () => {
  const { response, payload } = await get("/search/astell");

  if (!("error" in payload)) {
    throw new Error("Expected error response to `/search/astell`");
  }

  assertEquals(payload.error, "No search parameters provided.");
  assertEquals(response.status, 400);
});

test("`/search/:author/:text?regex=exp` returns search results", async () => {
  const textId = "astell/llg";
  const regex = "severest (test|exam) my thoughts? can put 'em to";
  const path = `/search/${textId}?regex=${
    encodeURIComponent(
      regex,
    )
  }&flags=i` as const;
  const { payload } = await get(path);

  if ("error" in payload) {
    throw new Error(
      `Error fetching search results for ${path}: ${payload.error}`,
    );
  }

  assertEquals(payload.data, [
    {
      id: "Astell.LLG.1.2",
      type: "paragraph",
      text:
        "Reading the other day the Third Volume of your excellent Discourses, as I do every thing you Write with great Pleasure and no less Advantage; yet taking the liberty that I use with other Books, (and yours or no bodies will bear it) to raise all the Objections that ever I can, and to make them undergo the <mark>severest Test my Thoughts can put 'em to</mark> before they pass for currant, a difficulty arose which without your assistance I know not how to solve.",
    },
  ]);
});

test("`/search/:author/:text?query=text` returns search results", async () => {
  const textId = "astell/llg";
  const query = "severest test my thoughts can put them to";
  const path = `/search/${textId}?query=${encodeURIComponent(query)}` as const;
  const { payload } = await get(path);

  if ("error" in payload) {
    throw new Error(
      `Error fetching search results for ${path}: ${payload.error}`,
    );
  }

  assertEquals(payload.data, [
    {
      id: "Astell.LLG.1.2",
      type: "paragraph",
      text:
        "Reading the other day the Third Volume of your excellent Discourses, as I do every thing you Write with great Pleasure and no less Advantage; yet taking the liberty that I use with other Books, (and yours or no bodies will bear it) to raise all the Objections that ever I can, and to make them undergo the <mark>severest Test my Thoughts can put 'em to</mark> before they pass for currant, a difficulty arose which without your assistance I know not how to solve.",
    },
  ]);
});

test("`/search/:author/:text?query=text` is optionally case sensitive", async () => {
  const textId = "astell/llg";

  // case doesn't match - should return no results
  const query1 = "severest test my thoughts can put 'em to";
  const path1 = `/search/${textId}?query=${
    encodeURIComponent(
      query1,
    )
  }&caseInsensitive=off` as const;
  const { payload: payload1 } = await get(path1);

  if ("error" in payload1) {
    throw new Error(
      `Error fetching search results for ${path1}: ${payload1.error}`,
    );
  }

  assertEquals(payload1.data, []);

  // case matches - should return result
  const query2 = "severest Test my Thoughts can put 'em to";
  const path2 = `/search/${textId}?query=${
    encodeURIComponent(
      query2,
    )
  }&caseInsensitive=off` as const;
  const { payload: payload2 } = await get(path2);

  if ("error" in payload2) {
    throw new Error(
      `Error fetching search results for ${path2}: ${payload2.error}`,
    );
  }

  assertEquals(payload2.data, [
    {
      id: "Astell.LLG.1.2",
      type: "paragraph",
      text:
        "Reading the other day the Third Volume of your excellent Discourses, as I do every thing you Write with great Pleasure and no less Advantage; yet taking the liberty that I use with other Books, (and yours or no bodies will bear it) to raise all the Objections that ever I can, and to make them undergo the <mark>severest Test my Thoughts can put 'em to</mark> before they pass for currant, a difficulty arose which without your assistance I know not how to solve.",
    },
  ]);
});

// TODO
test("`/search/:author/:text?query=text` is optionally punctuation sensitive", async () => {});

test("`/search/:author/:text?query=text` optionally matches whole words only", async () => {});

test("`/search/:author/:text?query=text` optionally matches exact spelling only", async () => {});
