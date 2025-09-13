import { validate } from "@englishphilosophy/markit";
import { assertEquals } from "@std/assert";
import { test } from "@std/testing/bdd";

test("all texts are valid markit", async () => {
  const result = await validate("./texts", { contextDirectory: "./texts" });
  assertEquals(result, []);
});
