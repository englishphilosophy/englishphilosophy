import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import normalize from "../src/normalize.ts";

describe("normalize", () => {
  it("basically works", () => {
    const sourceText =
      "And sure, I shall not need many words to persuade you to close with this Proposal. The very offer is a sufficient inducement; nor does it need the set-off's of Rhetorick to recommend it, were I capable, which yet I am not, of applying them with the greatest force. Since you cannot be so unkind to your selves, as to refuse your real Interest; I only entreat you to be so wise as to examine wherein it consists; for nothing is of worser consequence than to be deceiv'd in a matter of so great concern. 'Tis as little beneath your Grandeur as your Prudence, to examine curiously what is in this case offer'd you; and to take care that cheating Hucksters don't impose upon you with deceitful Ware.";
    const normalizedText =
      "And sure, I shall not need many words to persuade you to close with this Proposal. The very offer is a sufficient inducement; nor does it need the set-off's of Rhetoric to recommend it, were I capable, which yet I am not, of applying them with the greatest force. Since you cannot be so unkind to your selves, as to refuse your real Interest; I only entreat you to be so wise as to examine wherein it consists; for nothing is of worser consequence than to be deceived in a matter of so great concern. It is as little beneath your Grandeur as your Prudence, to examine curiously what is in this case offered you; and to take care that cheating Hucksters do not impose upon you with deceitful Ware.";
    assertEquals(normalize(sourceText), normalizedText);
  });
});
