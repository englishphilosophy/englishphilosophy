import { assert } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import getVariants from "../src/getVariants.ts";

describe("getVariants", () => {
  it("basically works", () => {
    assert(getVariants("them").includes("them"));
    assert(getVariants("them").includes("'em"));

    assert(getVariants("don't").includes("don't"));
    assert(getVariants("don't").includes("do not"));

    assert(getVariants("would").includes("would"));
    assert(getVariants("would").includes("wou'd"));

    assert(getVariants("connection").includes("connection"));
    assert(getVariants("connection").includes("connexion"));

    assert(getVariants("connections").includes("connections"));
    assert(getVariants("connections").includes("connexions"));

    assert(getVariants("surprize").includes("surprize"));
    assert(getVariants("surprize").includes("surprise"));

    assert(getVariants("surprized").includes("surprized"));
    assert(getVariants("surprized").includes("surprised"));
    assert(getVariants("surprized").includes("surpriz'd"));
  });
});
