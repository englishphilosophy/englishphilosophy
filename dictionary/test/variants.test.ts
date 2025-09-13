import { assert, assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import variants from "../data/variants.ts";

describe("variants", () => {
  it("does not contain duplicate variant records", () => {
    const seen = new Set<string>();
    for (const [from] of variants) {
      assert(seen.has(from) === false, `Duplicate variant record: ${from}`);
      seen.add(from);
    }
  });

  it("does not map anything to itself", () => {
    for (const [from, to] of variants) {
      assert(from !== to, `Variant maps to itself: ${from}`);
    }
  });

  it("does not contain any non-standard standard forms", () => {
    const froms = variants.map(([from]) => from);
    for (const [, to] of variants) {
      assert(
        !froms.includes(to),
        `Standard from maps to another standard form: ${to}`,
      );
    }
  });

  it("only uses lowercase", () => {
    for (const [from, to] of variants) {
      if (from.match(/\bI\b/)) continue; // allow "I" in contractions like "I'd"
      assertEquals(
        from,
        from.toLowerCase(),
        `Variant 'from' is not lowercase: ${from}`,
      );
      assertEquals(
        to,
        to.toLowerCase(),
        `Variant 'to' is not lowercase: ${to}`,
      );
    }
  });
});
