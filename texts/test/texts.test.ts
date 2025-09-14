import { validate } from "@englishphilosophy/markit";
import { assert, assertEquals } from "@std/assert";
import { test } from "@std/testing/bdd";
import {
  validateAuthor,
  validateIndex,
  validateText,
} from "./utils/validators.ts";
import { textsDir } from "../src/getPath.ts";
import getAuthor from "../src/getAuthor.ts";
import getIndex from "../src/getIndex.ts";
import getText from "../src/getText.ts";

test("all texts are valid markit", async () => {
  const result = await validate(textsDir, { contextDirectory: textsDir });
  assertEquals(result, []);
});

test("index matches schema", async () => {
  const index = await getIndex();
  assert(
    validateIndex(index),
    validateIndex.errors ? validateIndex.errors[0].message : undefined,
  );
});

test("all authors match schema", async () => {
  const index = await getIndex();
  for (const child of index.children) {
    const author = await getAuthor(child.id);
    if (!author) {
      throw new Error(`Author ${child.id} (referenced in index) not found`);
    }

    assert(
      validateAuthor(author),
      validateAuthor.errors
        ? `Author ${child.id} is invalid: ${validateAuthor.errors![0].message}`
        : undefined,
    );
  }
});

test("all texts match schema", async () => {
  const index = await getIndex();
  for (const child of index.children) {
    const author = await getAuthor(child.id);
    if (!author) {
      throw new Error(`Author ${child.id} (referenced in index) not found`);
    }

    for (const child of author.children) {
      const text = await getText(child.id, "markit");
      if (!text) {
        throw new Error(
          `Text ${child.id} (referenced in author ${author.id}) not found`,
        );
      }

      assert(
        validateText(text),
        validateText.errors
          ? `Text ${child.id} is invalid: ${validateText.errors[0].message}`
          : undefined,
      );
    }
  }
});
